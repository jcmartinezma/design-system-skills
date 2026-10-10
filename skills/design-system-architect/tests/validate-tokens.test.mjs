import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTokens } from '../scripts/validate-tokens.mjs';

const skillRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const scriptPath = join(skillRoot, 'scripts', 'validate-tokens.mjs');
const starterTokens = join(skillRoot, 'templates', 'tokens');
const schema = 'https://www.designtokens.org/tr/2025.10/format/';

async function writeTree(files) {
	const dir = await mkdtemp(join(tmpdir(), 'ds-tokens-'));
	for (const [relPath, contents] of Object.entries(files)) {
		const fullPath = join(dir, relPath);
		await mkdir(dirname(fullPath), { recursive: true });
		const body = typeof contents === 'string' ? contents : `${JSON.stringify(contents, null, 2)}\n`;
		await writeFile(fullPath, body);
	}
	return dir;
}

function codes(findings) {
	return findings.map((item) => item.code);
}

test('starter templates have no errors or warnings', async () => {
	const result = await validateTokens(starterTokens);
	assert.equal(result.ok, true, JSON.stringify(result.errors, null, 2));
	assert.deepEqual(result.errors, []);
	assert.deepEqual(result.warnings, []);
	assert.ok(result.byLayer.core > 0);
	assert.ok(result.byLayer.semantic > 0);
	assert.ok(result.byLayer.composite > 0);
	assert.ok(result.byLayer.theme > 0);
});

test('resolves $root aliases and flags core aliases', async () => {
	const dir = await writeTree({
		'core/color.core.json': {
			$schema: schema,
			color: {
				$type: 'color',
				white: { $value: '#ffffff', $description: 'white' },
				alias: { $value: '{color.white}', $description: 'not raw' },
			},
		},
		'semantic/color.semantic.json': {
			$schema: schema,
			color: {
				$type: 'color',
				bg: {
					primary: {
						$root: { $value: '{color.white}', $description: 'page' },
					},
				},
				action: {
					primary: {
						$root: { $value: '{color.bg.primary}', $description: 'action uses the public name' },
					},
				},
			},
		},
	});
	try {
		const result = await validateTokens(dir);
		assert.ok(codes(result.errors).includes('core-alias'));
		assert.equal(codes(result.errors).includes('unresolved-ref'), false);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});

test('reports unresolved references, cycles, raw semantic color, and theme orphans', async () => {
	const dir = await writeTree({
		'core/color.core.json': {
			$schema: schema,
			color: {
				$type: 'color',
				white: { $value: '#ffffff', $description: 'white' },
			},
		},
		'semantic/color.semantic.json': {
			$schema: schema,
			color: {
				$type: 'color',
				bg: {
					primary: { $root: { $value: '{color.missing}', $description: 'missing target' } },
				},
				text: {
					primary: { $root: { $value: '{color.text.danger}', $description: 'cycle a' } },
					danger: { $root: { $value: '{color.text.primary}', $description: 'cycle b' } },
				},
				border: {
					primary: { $root: { $value: '#112233', $description: 'hardcoded' } },
				},
				action: {
					primary: { $root: { $value: '{color.white}', $description: 'action exists' } },
				},
			},
		},
		'theme/dark/color.semantic.json': {
			$schema: schema,
			color: {
				$type: 'color',
				bg: {
					unknown: { $root: { $value: '{color.white}', $description: 'not in semantic' } },
				},
			},
		},
	});
	try {
		const result = await validateTokens(dir);
		const errorCodes = codes(result.errors);
		assert.ok(errorCodes.includes('unresolved-ref'));
		assert.ok(errorCodes.includes('circular-ref'));
		assert.ok(errorCodes.includes('raw-color'));
		assert.ok(errorCodes.includes('theme-orphan'));
		assert.equal(result.ok, false);
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});

test('missing descriptions and a missing action role are warnings', async () => {
	const dir = await writeTree({
		'semantic/color.semantic.json': {
			$schema: schema,
			color: {
				$type: 'color',
				bg: {
					primary: { $root: { $value: '{color.white}' } },
				},
			},
		},
		'core/color.core.json': {
			$schema: schema,
			color: {
				$type: 'color',
				white: { $value: '#ffffff', $description: 'white' },
			},
		},
	});
	try {
		const result = await validateTokens(dir);
		assert.equal(result.ok, true);
		const warningCodes = codes(result.warnings);
		assert.ok(warningCodes.includes('missing-description'));
		assert.ok(warningCodes.includes('missing-action'));
		assert.ok(warningCodes.includes('missing-theme'));
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});

test('rejects invalid JSON and a missing directory', async () => {
	const dir = await writeTree({
		'core/color.core.json': '{',
	});
	try {
		const broken = await validateTokens(dir);
		assert.ok(codes(broken.errors).includes('invalid-json'));
		const missing = await validateTokens(join(dir, 'does-not-exist'));
		assert.ok(codes(missing.errors).includes('missing-directory'));
	} finally {
		await rm(dir, { recursive: true, force: true });
	}
});

test('CLI exits 0 for the starter and 1 for a bad directory', () => {
	const good = spawnSync(process.execPath, [scriptPath, starterTokens, '--json'], { encoding: 'utf8' });
	assert.equal(good.status, 0, good.stderr);
	const parsed = JSON.parse(good.stdout);
	assert.equal(parsed.ok, true);

	const bad = spawnSync(process.execPath, [scriptPath, join(starterTokens, 'missing')], { encoding: 'utf8' });
	assert.equal(bad.status, 1);
	assert.match(bad.stdout, /missing-directory/);
});
