# design-system-architect

Skill for an AI agent that either scaffolds a design system or audits one.

The scaffold is brand-neutral. It follows a layered DTCG model: raw **core** values, **semantic** roles, **composite** styles, and **theme** overrides such as dark mode. Component specs, patterns, governance, and agent instructions sit beside the tokens. The audit scores an existing repo against that model and returns a prioritized plan.

No packages are required. The token checker uses Node.js.

## Install

Copy `skills/design-system-architect/` into the skills directory your agent reads. Ask for a new system, or ask it to audit the repo you have open.

## Run the token checker

From this folder:

```sh
node scripts/validate-tokens.mjs templates/tokens
node scripts/validate-tokens.mjs path/to/docs/tokens --json
```

From the repository root:

```sh
node skills/design-system-architect/scripts/validate-tokens.mjs skills/design-system-architect/templates/tokens
```

Exit 0 means there were no errors. Warnings (for example a missing `color.action` role) are printed and do not fail the process. `--json` prints the same result as JSON.

## Run the tests

From this folder:

```sh
node --test tests/validate-tokens.test.mjs
```

From the repository root:

```sh
node --test skills/design-system-architect/tests/validate-tokens.test.mjs
```

The tests check the starter tokens and small temporary fixtures (broken aliases, cycles, raw semantic color, theme orphans, the CLI exit codes). They do not install dependencies.

## What the agent reads

`SKILL.md` is the entry point. It asks a short set of questions, then branches into scaffold or audit. Deeper rules live in `references/`. Files the agent copies live in `templates/`. `examples/` shows a finished scaffold summary and a finished audit.

## Tree

```
design-system-architect/
├── SKILL.md
├── README.md
├── references/
│   ├── audit-rubric.md
│   ├── component-spec-requirements.md
│   ├── governance-essentials.md
│   ├── reference-architecture.md
│   └── token-layering-and-naming.md
├── templates/
│   ├── agents/
│   │   ├── AGENTS.md
│   │   ├── CONTRIBUTING.md
│   │   └── cursor-rule-design-system-core.mdc
│   ├── components/
│   │   ├── metadata.json
│   │   └── spec.md
│   ├── docs/
│   │   └── readme.md
│   ├── foundations/
│   │   └── tokens.md
│   ├── governance/
│   │   ├── CHANGELOG.md
│   │   ├── CODEOWNERS
│   │   ├── contribution-model.md
│   │   ├── decisions-backlog.md
│   │   ├── quality-bar.md
│   │   └── versioning.md
│   ├── patterns/
│   │   └── pattern.md
│   ├── tokens/
│   │   ├── core/
│   │   │   ├── border.core.json
│   │   │   ├── color.core.json
│   │   │   ├── motion.core.json
│   │   │   ├── radius.core.json
│   │   │   ├── shadow.core.json
│   │   │   ├── spacing.core.json
│   │   │   └── typography.core.json
│   │   ├── semantic/
│   │   │   ├── color.semantic.json
│   │   │   ├── motion.semantic.json
│   │   │   ├── radius.semantic.json
│   │   │   ├── spacing.semantic.json
│   │   │   └── typography.semantic.json
│   │   ├── composite/
│   │   │   ├── border.composite.json
│   │   │   ├── motion.composite.json
│   │   │   ├── shadow.composite.json
│   │   │   └── typography.composite.json
│   │   └── theme/
│   │       └── dark/
│   │           └── color.semantic.json
│   └── vision/
│       ├── design-principles.md
│       ├── voice-and-tone.md
│       └── writing-guidelines.md
├── examples/
│   ├── sample-audit-report.md
│   └── scaffold-walkthrough.md
├── scripts/
│   └── validate-tokens.mjs
└── tests/
    └── validate-tokens.test.mjs
```
