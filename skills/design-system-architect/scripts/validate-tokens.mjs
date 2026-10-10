#!/usr/bin/env node
/**
 * Check a DTCG token directory (core / semantic / composite / theme).
 *
 * Usage (from the skill folder):
 *   node scripts/validate-tokens.mjs templates/tokens
 *   node scripts/validate-tokens.mjs path/to/docs/tokens --json
 *
 * Exit 0 when there are no errors. Warnings do not fail the run.
 * Exit 1 when the directory is missing, unreadable, or any error is found.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const META_KEYS = new Set(['$schema', '$description', '$type', '$extensions']);
const LAYERS = ['core', 'semantic', 'composite', 'theme'];
const SCHEMA_PREFIX = 'https://www.designtokens.org/';
const RAW_COLOR = /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\()/;
const ALLOWED_COLOR_KEYWORDS = new Set(['transparent', 'currentcolor']);

/**
 * @param {'error' | 'warning'} severity
 * @param {string} code
 * @param {string} message
 * @param {{ file?: string, path?: string }} [extra]
 */
function finding(severity, code, message, extra = {}) {
	return {
		severity,
		code,
		message,
		file: extra.file ?? null,
		path: extra.path ?? null,
	};
}

function isTokenNode(node) {
	return Boolean(node) && typeof node === 'object' && !Array.isArray(node) && '$value' in node;
}

/** Pull every `{token.path}` out of a DTCG value (string, object, or array). */
function extractRefs(value, found = []) {
	if (typeof value === 'string') {
		const re = /\{([a-zA-Z0-9_.$-]+)\}/g;
		let match = re.exec(value);
		while (match) {
			found.push(match[1]);
			match = re.exec(value);
		}
		return found;
	}
	if (Array.isArray(value)) {
		for (const item of value) extractRefs(item, found);
		return found;
	}
	if (value && typeof value === 'object') {
		for (const item of Object.values(value)) extractRefs(item, found);
	}
	return found;
}

function isRawColor(value) {
	if (typeof value !== 'string') return false;
	const trimmed = value.trim();
	if (ALLOWED_COLOR_KEYWORDS.has(trimmed.toLowerCase())) return false;
	if (/^\{[a-zA-Z0-9_.$-]+\}$/.test(trimmed)) return false;
	return RAW_COLOR.test(trimmed);
}

function layerFromRelative(relPath) {
	const top = relPath.split(/[/\\]/)[0];
	return LAYERS.includes(top) ? top : 'unknown';
}

function expectedSuffix(layer) {
	if (layer === 'core') return '.core.json';
	if (layer === 'semantic' || layer === 'theme') return '.semantic.json';
	if (layer === 'composite') return '.composite.json';
	return null;
}

async function listJsonFiles(dir, root = dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await listJsonFiles(full, root)));
		} else if (entry.name.endsWith('.json')) {
			files.push(relative(root, full));
		}
	}
	return files;
}

function walkTokens(node, segments, inheritedType, file, layer, tokens) {
	if (!node || typeof node !== 'object' || Array.isArray(node)) return;

	if (isTokenNode(node)) {
		const publicSegments = segments.filter((segment) => segment !== '$root');
		tokens.push({
			file,
			layer,
			segments,
			publicSegments,
			path: segments.join('.'),
			publicPath: publicSegments.join('.'),
			value: node.$value,
			type: typeof node.$type === 'string' ? node.$type : inheritedType,
			description: typeof node.$description === 'string' ? node.$description : '',
		});
		return;
	}

	const nextType = typeof node.$type === 'string' ? node.$type : inheritedType;
	for (const [key, value] of Object.entries(node)) {
		if (META_KEYS.has(key)) continue;
		if (key.startsWith('$') && key !== '$root') continue;
		walkTokens(value, [...segments, key], nextType, file, layer, tokens);
	}
}

/**
 * @param {string} tokensDir Absolute or relative path to the tokens root.
 * @returns {Promise<{
 *   tokensDir: string,
 *   tokens: number,
 *   byLayer: Record<string, number>,
 *   errors: Array<ReturnType<typeof finding>>,
 *   warnings: Array<ReturnType<typeof finding>>,
 *   ok: boolean
 * }>}
 */
export async function validateTokens(tokensDir) {
	const errors = [];
	const warnings = [];
	const tokens = [];

	let files;
	try {
		files = await listJsonFiles(tokensDir);
	} catch (error) {
		const code = error && error.code === 'ENOENT' ? 'missing-directory' : 'unreadable-directory';
		errors.push(finding('error', code, `Cannot read token directory: ${tokensDir}`));
		return summarize(tokensDir, tokens, errors, warnings);
	}

	if (files.length === 0) {
		errors.push(finding('error', 'no-token-files', 'No JSON token files found.'));
		return summarize(tokensDir, tokens, errors, warnings);
	}

	for (const relFile of files.sort()) {
		const layer = layerFromRelative(relFile);
		if (layer === 'unknown') {
			warnings.push(
				finding(
					'warning',
					'unexpected-file',
					'JSON file is outside core/, semantic/, composite/, or theme/.',
					{ file: relFile },
				),
			);
		}

		const suffix = expectedSuffix(layer);
		const base = relFile.split(/[/\\]/).pop();
		if (suffix && base && !base.endsWith(suffix)) {
			warnings.push(
				finding(
					'warning',
					'file-name',
					`Expected a name ending in ${suffix}.`,
					{ file: relFile },
				),
			);
		}

		let json;
		try {
			json = JSON.parse(await readFile(join(tokensDir, relFile), 'utf8'));
		} catch (error) {
			errors.push(
				finding('error', 'invalid-json', error.message || 'Invalid JSON.', { file: relFile }),
			);
			continue;
		}

		if (!json || typeof json !== 'object' || Array.isArray(json)) {
			errors.push(finding('error', 'invalid-json', 'Token file must be a JSON object.', { file: relFile }));
			continue;
		}

		if (typeof json.$schema !== 'string' || !json.$schema.startsWith(SCHEMA_PREFIX)) {
			warnings.push(
				finding(
					'warning',
					'missing-schema',
					`Set $schema to a ${SCHEMA_PREFIX} document.`,
					{ file: relFile },
				),
			);
		}

		walkTokens(json, [], null, relFile, layer, tokens);
	}

	const byKey = new Map();
	const themeSeen = new Map();
	const themeModeWarnings = new Set();
	for (const token of tokens) {
		if (token.layer === 'theme') {
			const mode = themeMode(token.file);
			if (!mode && !themeModeWarnings.has(token.file)) {
				themeModeWarnings.add(token.file);
				warnings.push(
					finding(
						'warning',
						'theme-mode',
						'Put theme overrides in theme/<mode>/. The mode name is the folder (for example theme/dark/).',
						{ file: token.file },
					),
				);
			}
			registerTheme(themeSeen, mode, token, errors);
			continue;
		}
		registerKey(byKey, token.path, token, errors);
		if (token.publicPath !== token.path) {
			registerKey(byKey, token.publicPath, token, errors);
		}
	}

	for (const token of tokens) {
		if (!token.type) {
			errors.push(
				finding('error', 'missing-type', 'Token has no $type of its own or on a parent group.', {
					file: token.file,
					path: token.publicPath,
				}),
			);
		}

		if (!token.description.trim()) {
			warnings.push(
				finding('warning', 'missing-description', 'Token has no $description.', {
					file: token.file,
					path: token.publicPath,
				}),
			);
		}

		if (token.value === null || token.value === '') {
			errors.push(
				finding('error', 'empty-value', 'Token $value is empty.', {
					file: token.file,
					path: token.publicPath,
				}),
			);
		}

		const refs = extractRefs(token.value);
		if (token.layer === 'core' && refs.length > 0) {
			errors.push(
				finding(
					'error',
					'core-alias',
					'Core tokens must store raw values. Move this alias to semantic, composite, or theme.',
					{ file: token.file, path: token.publicPath },
				),
			);
		}

		if (token.layer !== 'core' && containsRawColor(token.value)) {
			errors.push(
				finding(
					'error',
					'raw-color',
					'Color outside core must alias a core token (for example {color.brand.700}).',
					{ file: token.file, path: token.publicPath },
				),
			);
		}
	}

	const state = new Map();
	for (const token of tokens) {
		visit(token, byKey, state, [], errors);
	}

	const semanticPaths = new Set(
		tokens.filter((token) => token.layer === 'semantic').map((token) => token.publicPath),
	);
	for (const token of tokens) {
		if (token.layer === 'theme' && !semanticPaths.has(token.publicPath)) {
			errors.push(
				finding(
					'error',
					'theme-orphan',
					'Theme files may only override a semantic token that already exists.',
					{ file: token.file, path: token.publicPath },
				),
			);
		}
	}

	const semanticColor = tokens.filter(
		(token) => token.layer === 'semantic' && (token.type === 'color' || token.publicPath.startsWith('color.')),
	);
	if (semanticColor.length > 0 && !semanticColor.some((token) => token.publicPath.startsWith('color.action.'))) {
		warnings.push(
			finding(
				'warning',
				'missing-action',
				'No color.action.* tokens. Interactive fills then get borrowed from surface or icon roles.',
			),
		);
	}

	const hasTheme = tokens.some((token) => token.layer === 'theme');
	if (semanticColor.length > 0 && !hasTheme) {
		warnings.push(
			finding(
				'warning',
				'missing-theme',
				'No theme override file. Add theme/<mode>/color.semantic.json before claiming a second mode.',
			),
		);
	}

	return summarize(tokensDir, tokens, errors, warnings);
}

function themeMode(file) {
	const parts = file.split(/[/\\]/);
	if (parts[0] === 'theme' && parts.length >= 3) return parts[1];
	return '';
}

function registerTheme(themeSeen, mode, token, errors) {
	const keys = token.publicPath === token.path ? [token.path] : [token.path, token.publicPath];
	for (const key of keys) {
		const id = `${mode}:${key}`;
		const existing = themeSeen.get(id);
		if (existing && existing !== token) {
			errors.push(
				finding('error', 'duplicate-path', `More than one ${mode || 'theme'} token resolves to ${key}.`, {
					file: token.file,
					path: key,
				}),
			);
		} else {
			themeSeen.set(id, token);
		}
	}
}

function registerKey(byKey, key, token, errors) {
	const existing = byKey.get(key);
	if (existing && existing !== token) {
		errors.push(
			finding('error', 'duplicate-path', `More than one token resolves to ${key}.`, {
				file: token.file,
				path: key,
			}),
		);
		return;
	}
	byKey.set(key, token);
}

function containsRawColor(value) {
	if (isRawColor(value)) return true;
	if (Array.isArray(value)) return value.some((item) => containsRawColor(item));
	if (value && typeof value === 'object') {
		return Object.values(value).some((item) => containsRawColor(item));
	}
	return false;
}

function visit(token, byKey, state, trail, errors) {
	const mark = state.get(token);
	if (mark === 'done') return;
	if (mark === 'visiting') {
		const cycle = [...trail.map((item) => item.publicPath), token.publicPath].join(' → ');
		errors.push(
			finding('error', 'circular-ref', `Circular token reference: ${cycle}`, {
				file: token.file,
				path: token.publicPath,
			}),
		);
		return;
	}

	state.set(token, 'visiting');
	for (const ref of extractRefs(token.value)) {
		const target = byKey.get(ref);
		if (!target) {
			errors.push(
				finding('error', 'unresolved-ref', `Unresolved reference {${ref}}.`, {
					file: token.file,
					path: token.publicPath,
				}),
			);
			continue;
		}
		visit(target, byKey, state, [...trail, token], errors);
	}
	state.set(token, 'done');
}

function summarize(tokensDir, tokens, errors, warnings) {
	const byLayer = { core: 0, semantic: 0, composite: 0, theme: 0, unknown: 0 };
	for (const token of tokens) {
		byLayer[token.layer] = (byLayer[token.layer] ?? 0) + 1;
	}
	const sortKey = (item) => `${item.code}:${item.file ?? ''}:${item.path ?? ''}:${item.message}`;
	errors.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
	warnings.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
	return {
		tokensDir,
		tokens: tokens.length,
		byLayer,
		errors,
		warnings,
		ok: errors.length === 0,
	};
}

export function formatReport(result) {
	const lines = [
		`tokens: ${result.tokens} (core ${result.byLayer.core}, semantic ${result.byLayer.semantic}, composite ${result.byLayer.composite}, theme ${result.byLayer.theme})`,
		`errors: ${result.errors.length}`,
		`warnings: ${result.warnings.length}`,
	];
	for (const item of [...result.errors, ...result.warnings]) {
		const where = [item.file, item.path].filter(Boolean).join(' ');
		lines.push(`${item.severity} ${item.code}${where ? ` ${where}` : ''} — ${item.message}`);
	}
	return `${lines.join('\n')}\n`;
}

async function main() {
	const args = process.argv.slice(2);
	const asJson = args.includes('--json');
	const tokensDir = args.find((arg) => !arg.startsWith('--'));
	if (!tokensDir) {
		console.error('Usage: node scripts/validate-tokens.mjs <tokens-dir> [--json]');
		process.exit(1);
	}
	const result = await validateTokens(tokensDir);
	if (asJson) {
		console.log(JSON.stringify(result, null, 2));
	} else {
		console.log(formatReport(result).trimEnd());
	}
	process.exit(result.ok ? 0 : 1);
}

const invokedPath = process.argv[1] ? process.argv[1].replaceAll('\\', '/') : '';
if (invokedPath.endsWith('/validate-tokens.mjs')) {
	main();
}
