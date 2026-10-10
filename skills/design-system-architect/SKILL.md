---
name: design-system-architect
description: >-
  Scaffolds a brand-neutral design system (DTCG tokens, component specs,
  governance, and agent guidance) or audits an existing system and returns a
  maturity score, gaps, and a prioritized plan. Use when creating a design
  system from scratch or reviewing tokens, theming, components, docs, patterns,
  governance, tooling, or AI-agent guidance.
---

# Design system architect

Two modes:

1. **Scaffold.** Lay down a complete, brand-neutral design-system structure.
2. **Audit.** Compare the user's repo with that structure, score it, and propose a plan.

Tokens, specs, and governance stay in git. Figma, CSS, and component code mirror those names. They do not grow a second palette.

Do not copy another product's name, fonts, or hex values. Use the templates in this skill and the brand inputs the user gives you.

## When to use it

- The user wants a design system created from scratch.
- The user wants an audit, a maturity score, a gap list, or an improvement plan.
- The user asks how tokens, themes, specs, patterns, and agent docs fit together.

Do not use it to implement product UI, to push a file into Figma, or to replace a token pipeline the team already runs. Do that work after the source of truth is clear, and only if the user asks.

## Ask first

Ask only what the user has not already answered.

1. **Platforms.** Web, iOS, Android, email, or something else?
2. **Brand inputs.** Palette, type families, logo, voice. If there are none, keep the template ramps and mark them as placeholders.
3. **Tooling.** Style Dictionary, Tokens Studio, a docs site, Storybook, lint, tests, CI.
4. **Figma.** Is there a library file? Is git or Figma the source of truth for values?
5. **Mode.** Scaffold, audit, or audit and then apply the plan?
6. **Owner.** The person or team who replaces `{owner}`.

## Modes

### Scaffold

1. Confirm the destination folder and the system name. Do not overwrite existing files. List collisions and stop for those paths.
2. Read [references/reference-architecture.md](references/reference-architecture.md) and copy templates using its table.
3. Read [references/token-layering-and-naming.md](references/token-layering-and-naming.md) before editing any JSON. Put real brand values in core only when the user supplied them.
4. Replace `{system-name}`, `{owner}`, `{date}`, and `{platforms}` in the copied docs.
5. Run the validator on the new `docs/tokens` directory. Fix every error before you finish. Report warnings.
6. Read [references/component-spec-requirements.md](references/component-spec-requirements.md) only when the user names a component or pattern to spec. Copy `_template` and fill every section.
7. Read [references/governance-essentials.md](references/governance-essentials.md) if the user wants the process docs adjusted beyond the templates.
8. Summarize what was created, what is still a placeholder, and which backlog items need a decision. See [examples/scaffold-walkthrough.md](examples/scaffold-walkthrough.md).

### Audit

1. Inspect the repo. Do not assume these folder names exist.
2. Read the architecture, token, component, and governance references so the comparison stays stable.
3. Read [references/audit-rubric.md](references/audit-rubric.md) and score only what you can show.
4. If DTCG JSON is present, run the validator and quote the summary.
5. Write the report in the rubric's output format. See [examples/sample-audit-report.md](examples/sample-audit-report.md).
6. Do not edit the repo unless the user asks you to apply the plan. When they do, use the scaffold steps for the missing pieces and leave unrelated files alone.

## Token check

From this skill's directory:

```sh
node scripts/validate-tokens.mjs path/to/docs/tokens
node scripts/validate-tokens.mjs path/to/docs/tokens --json
node --test tests/validate-tokens.test.mjs
```

Node.js is the only dependency. The script checks DTCG shape, layer rules, aliases, `$root` names, theme overrides, and a missing `color.action` role. It does not compute contrast and it does not emit CSS. Exit 0 means no errors. Warnings still belong in the report.

## Rules

- Specs cite token names. They do not invent hex or pixel values when a token exists.
- Dependencies flow vision → foundations → components → patterns. Governance wraps all of them.
- `color.action.*` paints controls. `color.surface.*` paints containers. `color.icon.*` paints icons.
- A missing rule becomes a backlog entry. It does not become a silent guess.
- A human owner approves merges.

## When to read each file

| Read it when | File |
|---|---|
| You need the target tree or the template copy table | [references/reference-architecture.md](references/reference-architecture.md) |
| You create, edit, or judge tokens | [references/token-layering-and-naming.md](references/token-layering-and-naming.md) |
| You create or judge a component or pattern | [references/component-spec-requirements.md](references/component-spec-requirements.md) |
| You create or judge process and agent docs | [references/governance-essentials.md](references/governance-essentials.md) |
| You score a system or write the report | [references/audit-rubric.md](references/audit-rubric.md) |
| You want a finished scaffold summary | [examples/scaffold-walkthrough.md](examples/scaffold-walkthrough.md) |
| You want a finished audit | [examples/sample-audit-report.md](examples/sample-audit-report.md) |
| You are checking JSON | [scripts/validate-tokens.mjs](scripts/validate-tokens.mjs) |
| You are changing the checker | [tests/validate-tokens.test.mjs](tests/validate-tokens.test.mjs) |

Copy these. Do not treat them as prose to paraphrase from scratch.

| Destination | Template |
|---|---|
| `docs/tokens/core/` | [templates/tokens/core/](templates/tokens/core/) |
| `docs/tokens/semantic/` | [templates/tokens/semantic/](templates/tokens/semantic/) |
| `docs/tokens/composite/` | [templates/tokens/composite/](templates/tokens/composite/) |
| `docs/tokens/theme/dark/` | [templates/tokens/theme/dark/color.semantic.json](templates/tokens/theme/dark/color.semantic.json) |
| `docs/components/_template/` | [templates/components/](templates/components/) |
| `docs/patterns/_template.md` | [templates/patterns/pattern.md](templates/patterns/pattern.md) |
| `docs/governance/` | [templates/governance/](templates/governance/) |
| `CHANGELOG.md` | [templates/governance/CHANGELOG.md](templates/governance/CHANGELOG.md) |
| `.github/CODEOWNERS` | [templates/governance/CODEOWNERS](templates/governance/CODEOWNERS) |
| `AGENTS.md` | [templates/agents/AGENTS.md](templates/agents/AGENTS.md) |
| `CONTRIBUTING.md` | [templates/agents/CONTRIBUTING.md](templates/agents/CONTRIBUTING.md) |
| `.cursor/rules/design-system-core.mdc` | [templates/agents/cursor-rule-design-system-core.mdc](templates/agents/cursor-rule-design-system-core.mdc) |
| `docs/vision/` | [templates/vision/](templates/vision/) |
| `docs/foundations/tokens.md` | [templates/foundations/tokens.md](templates/foundations/tokens.md) |
| `docs/README.md` | [templates/docs/readme.md](templates/docs/readme.md) |
