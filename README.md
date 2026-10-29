# design-system-skills

A collection of AI agent skills for day-to-day work with design systems and Spec-Driven Development (SDD): foundations and tokens, components, documentation, governance, metrics, and spec/plan/tasks scaffolding.

Each skill is a self-contained package: an agent reads its instructions and, when needed, runs its scripts to solve tasks reliably and repeatably.

## Why

Many design-system and documentation tasks are deterministic: generate color ramps, validate contrast, export tokens, audit components, scaffold SDD docs. Instead of the agent improvising each time, these skills give clear instructions and proven code to do them well.

## Repository structure

```
design-system-skills/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── skills/
    ├── skill-name/
    │   ├── SKILL.md        # Instructions for the agent (required)
    │   ├── README.md       # Documentation for people (recommended)
    │   ├── scripts/        # Executable logic (optional)
    │   ├── tests/          # Script tests (when scripts exist)
    │   └── examples/       # Sample inputs and outputs (optional)
    └── another-skill/
        └── ...
```

## What each skill includes

| File / folder | Required | For | Content |
|---|---|---|---|
| `SKILL.md` | Yes | Agent | What the skill does, when to use it, steps to follow, and which scripts to run |
| `README.md` | Recommended | People | Description, installation, dependencies, and examples |
| `scripts/` | No | Agent | Code that handles the deterministic part of the task |
| `tests/` | If there are scripts | Maintainers | Tests that keep the scripts working |
| `examples/` | No | Both | Use cases with expected input and output |

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
2. Run `python scripts/generate.py --input ...` and use its output.
```

## Naming conventions

- Folders in `kebab-case`, English, lowercase: `color-ramps`, `token-export`, `component-audit`.
- The frontmatter `name` field matches the folder name.
- Names describe the task, not the tool: `contrast-check` over `apca-script`.
- Scripts use clear verbs: `generate.py`, `validate.py`, `export.py`.

## How to use a skill

1. Copy the skill folder into your agent's skills directory.
2. Install any dependencies listed in its `README.md`, if any.
3. Ask the agent for the task as usual: it will read `SKILL.md` when relevant.

## How to add a new skill

1. Create a folder under `skills/` following the naming conventions.
2. Write `SKILL.md` with its frontmatter (`name` and `description`).
3. If the skill needs code, add it under `scripts/` and tests under `tests/`.
4. Document usage and dependencies in the skill's `README.md`.
5. Add the skill to the index in this README.
6. Open a pull request describing what the skill solves.

## Skills index

| Skill | Description | Status |
|---|---|---|
<<<<<<< HEAD
| [design-system-architect](skills/design-system-architect/) | Crea un design system desde cero (tokens DTCG, specs, gobernanza y guía para agentes) o audita uno existente y propone un plan de mejora. | Disponible |
| [aria-implementation](skills/aria-implementation/) | Especifica e implementa un componente interactivo accesible: HTML nativo primero, patrón del APG, nombre, estados, teclado y foco. | Disponible |
| [aria-review](skills/aria-review/) | Revisa código, un diff o una página y devuelve hallazgos de ARIA y teclado con severidad, criterio WCAG y un veredicto por componente. | Disponible |
| [spec-driven-development](skills/spec-driven-development/) | Lleva una feature con un SDD medio: una spec por feature, un plan corto, commits por paso y validación de cada criterio. | Disponible |

## License

This project is distributed under the license in [`LICENSE`](LICENSE).

---

Created by [José Carlos Martínez](https://jcmartinez.net), Product Designer focused on Design Systems and AI workflows.
