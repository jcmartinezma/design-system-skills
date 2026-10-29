# design-system-skills

A collection of AI agent skills for design systems and Spec-Driven Development (SDD): scaffolding and auditing a system, accessible components (ARIA), and medium SDD (spec, plan, optional epics, and project validation).

Each skill is a self-contained package. The agent reads `SKILL.md` and, when the skill includes them, uses its templates, references, or scripts.

## Why

Design-system and SDD work repeats the same decisions: how tokens are layered, what a component spec must include, which ARIA pattern fits, how a feature is scoped and checked. These skills give the agent a fixed workflow and, where useful, templates or a small script—so the output stays consistent instead of improvised each time.

## Repository structure

```
design-system-skills/
├── README.md
├── .gitignore
└── skills/
    ├── skill-name/
    │   ├── SKILL.md        # Instructions for the agent (required)
    │   ├── README.md       # Documentation for people (recommended)
    │   ├── templates/      # Files the agent copies into a product repo (optional)
    │   ├── references/     # Deeper guidance the agent reads on demand (optional)
    │   ├── examples/       # Finished sample outputs (optional)
    │   ├── scripts/        # Executable logic (optional; only some skills)
    │   └── tests/          # Script tests (when scripts exist)
    └── …
```

## What each skill includes

| File / folder | Required | For | Content |
|---|---|---|---|
| `SKILL.md` | Yes | Agent | What the skill does, when to use it, and the steps to follow |
| `README.md` | Recommended | People | Description, installation, and how the skill is used |
| `templates/` | No | Agent | Starter files copied into the product repo |
| `references/` | No | Agent | Pattern tables, rubrics, and other detail loaded when needed |
| `examples/` | No | Both | Finished samples that show the expected shape |
| `scripts/` | No | Agent | Code for a deterministic check or transform |
| `tests/` | If there are scripts | Maintainers | Tests that keep the scripts working |

Only [design-system-architect](skills/design-system-architect/) ships a script today (`scripts/validate-tokens.mjs`). The other skills are instructions, templates, and references.

### `SKILL.md` format

Every `SKILL.md` starts with frontmatter that identifies the skill:

```markdown
---
name: skill-name
description: One sentence explaining what it does and when the agent should use it.
---

# Skill name

## When to use it
...

## Steps
1. ...
2. ...
```

## Naming conventions

- Folders in `kebab-case`, English, lowercase: `design-system-architect`, `aria-review`, `spec-driven-development`.
- The frontmatter `name` field matches the folder name.
- Names describe the task, not the tool: `aria-review` over `axe-wrapper`.
- When a skill has scripts, use clear verbs and a runtime that matches the skill (this repo uses Node for the token validator).

## How to use a skill

1. Copy the skill folder into your agent's skills directory (for Cursor: `~/.cursor/skills/`).
2. Install any dependencies listed in its `README.md`, if any.
3. Ask the agent for the task as usual: it will read `SKILL.md` when relevant.

## How to add a new skill

1. Create a folder under `skills/` following the naming conventions.
2. Write `SKILL.md` with its frontmatter (`name` and `description`).
3. Add `templates/`, `references/`, or `examples/` when the skill needs them.
4. If the skill needs code, add it under `scripts/` and tests under `tests/`.
5. Document usage in the skill's `README.md`.
6. Add the skill to the index in this README.

## Skills index

| Skill | Description | Status |
|---|---|---|
| [design-system-architect](skills/design-system-architect/) | Scaffolds a design system from scratch (DTCG tokens, specs, governance, and agent guidance) or audits an existing one and proposes an improvement plan. | Available |
| [aria-implementation](skills/aria-implementation/) | Specifies and implements an accessible interactive component: native HTML first, APG pattern, name, states, keyboard, and focus. | Available |
| [aria-review](skills/aria-review/) | Reviews code, a diff, or a page and returns ARIA and keyboard findings with severity, WCAG criterion, and a per-component verdict. | Available |
| [spec-driven-development](skills/spec-driven-development/) | Ships a feature with medium SDD: one spec per feature, a short plan, optional epics, project validation rules, one commit per step, and criterion checks. | Available |

---

Created by [José Carlos Martínez](https://jcmartinez.net), Product Designer focused on Design Systems and AI workflows.
