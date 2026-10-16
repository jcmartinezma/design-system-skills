# aria-review

Skill for an AI agent that reviews ARIA and keyboard accessibility.

The agent inventories the interactive elements, compares them with the WAI-ARIA Authoring Practices Guide, and returns a findings table. Each finding has a severity, a WCAG success criterion, a location, and a fix. Each component gets a pass or fail verdict.

No packages are required. The review can run axe-core, eslint-plugin-jsx-a11y, or Lighthouse when the project already has them. It does not install them.

## Install

Copy `skills/aria-review/` into the skills directory your agent reads. Ask it to review a component, a diff, or a rendered page.

## What the agent reads

`SKILL.md` is the entry point. It is the nine-step procedure and the report format. `references/expected-behavior.md` is the pattern checklist. `references/anti-patterns.md` is the before-and-after fixes. `examples/sample-review.md` is a finished report.

## Tree

```
aria-review/
├── SKILL.md
├── README.md
├── references/
│   ├── anti-patterns.md
│   └── expected-behavior.md
└── examples/
    └── sample-review.md
```
