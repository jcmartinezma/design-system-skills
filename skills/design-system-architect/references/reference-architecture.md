# Reference architecture

Read this before scaffolding a system or mapping an existing repo. The tree is a target, not a requirement that every folder already exists. During an audit, record what you actually find.

## Folder tree

```
{repo}/
├── README.md
├── AGENTS.md                          # How an agent reads and extends the system
├── CONTRIBUTING.md
├── CHANGELOG.md                       # Required once versions are tagged
├── .github/
│   └── CODEOWNERS                     # Named reviewers
├── .cursor/
│   └── rules/
│       └── design-system-core.mdc     # Always-on layering rules
├── docs/
│   ├── README.md                      # Human map of the docs
│   ├── vision/                        # Principles, voice, writing
│   ├── foundations/                   # Why and how (markdown)
│   ├── tokens/                        # Values (DTCG JSON)
│   │   ├── core/
│   │   ├── semantic/
│   │   ├── composite/
│   │   └── theme/
│   │       └── dark/
│   │           └── color.semantic.json
│   ├── components/
│   │   ├── _template/                 # metadata.json + spec.md
│   │   └── {component}/
│   ├── patterns/
│   │   ├── _template.md
│   │   └── {pattern}.md
│   └── governance/
│       ├── contribution-model.md
│       ├── quality-bar.md
│       ├── versioning.md
│       └── decisions-backlog.md
└── site/                              # Optional docs site
    └── scripts/tokens/                # load → resolve → generate CSS
```

Guides and values are separate. `docs/foundations/` explains naming and usage. `docs/tokens/` holds the values. A component spec points at token names. It does not restate the hex.

## What each layer is for

| Layer | Question it answers | Must not contain |
|---|---|---|
| Vision | What kind of product is this? | Token values, component anatomy |
| Foundations | How do color, type, space, motion, and accessibility work? | Screen-specific layouts |
| Tokens | What is the named value? | Usage essays |
| Components | What is one UI element? | Multi-component flows |
| Patterns | How do components combine for a job? | New visual values |
| Governance | Who decides, and how is a change released? | Visual design |

Dependencies point downward: vision → foundations → components → patterns. A foundation token does not reference a component. Governance applies to every layer.

## Source of truth

- Token **values** live in git under `docs/tokens/`.
- Figma variables and styles are a mirror. Two collections: **Core** and **Semantic**. Composite tokens become text styles, effect styles, or paint styles, not extra variable collections.
- A theme file adds a mode on the Semantic collection. Light is the default semantic file. Dark is `docs/tokens/theme/dark/`.
- Do not invent a second layout such as Primitives / Color / Spacing / Typography when this architecture is the one the team adopted.

If the team already has a different source of truth, say so in the audit and do not silently relocate files.

## Token pipeline

A docs site or build step turns JSON into CSS. Keep three stages, even if the tool is Style Dictionary or a small Node script:

1. **Load** every JSON file under `core/`, `semantic/`, `composite/`, and `theme/`.
2. **Resolve** `{group.token}` aliases. `$root` is the default state and is omitted from the public name, so `{color.bg.primary}` points at `color.bg.primary.$root`.
3. **Generate** CSS variables. Core values are literal. Semantic and composite values prefer `var(--referenced-token)`. Dark overrides sit under `[data-theme="dark"]`.

Generated CSS is not edited by hand. The JSON is.

Ship the pipeline when the user asks for a docs site or a build. A new system can start with JSON plus the validator in this skill.

## Component and pattern contract

- One component is one folder: `docs/components/{name}/metadata.json` and `spec.md`.
- Skip folder names that start with `_`. `_template` is not a component.
- One pattern is one markdown file in `docs/patterns/`.
- Adding a component updates `docs/README.md`. It does not require a hand-written nav entry if the site discovers folders.

## Where to copy templates

| Template | Destination |
|---|---|
| `templates/tokens/` | `docs/tokens/` |
| `templates/components/` | `docs/components/_template/` |
| `templates/patterns/pattern.md` | `docs/patterns/_template.md` |
| `templates/governance/contribution-model.md` | `docs/governance/contribution-model.md` |
| `templates/governance/quality-bar.md` | `docs/governance/quality-bar.md` |
| `templates/governance/versioning.md` | `docs/governance/versioning.md` |
| `templates/governance/decisions-backlog.md` | `docs/governance/decisions-backlog.md` |
| `templates/governance/CHANGELOG.md` | `CHANGELOG.md` |
| `templates/governance/CODEOWNERS` | `.github/CODEOWNERS` |
| `templates/agents/AGENTS.md` | `AGENTS.md` |
| `templates/agents/CONTRIBUTING.md` | `CONTRIBUTING.md` |
| `templates/agents/cursor-rule-design-system-core.mdc` | `.cursor/rules/design-system-core.mdc` |
| `templates/vision/` | `docs/vision/` |
| `templates/foundations/tokens.md` | `docs/foundations/tokens.md` |
| `templates/docs/readme.md` | `docs/README.md` |

Replace `{system-name}`, `{owner}`, `{date}`, and `{platforms}` before you finish. Do not overwrite a file the user already maintains.

## What to leave out until asked

- A full component inventory. Scaffold the template, then spec the components the user names.
- An Astro (or other) docs site. Describe the pipeline; build the site only when requested.
- Platform code (React, Swift, Kotlin). Specs come first.
- Exhaustive token matrices. The starter scale is enough until a real screen needs the next step.
