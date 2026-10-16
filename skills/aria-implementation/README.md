# aria-implementation

Skill for an AI agent that specifies and implements one accessible interactive component.

The agent starts from a native HTML element, picks one pattern from the WAI-ARIA Authoring Practices Guide, and returns an accessibility spec, the component code, and a self-check. Disclosure and tabs are worked examples of that output.

No packages are required. The skill is instructions and references.

## Install

Copy `skills/aria-implementation/` into the skills directory your agent reads. Ask it to specify or build a component.

## What the agent reads

`SKILL.md` is the entry point. It has the rules that apply to every component and the output format. `references/patterns.md` has the role, state, and keyboard model for each pattern. `examples/` shows a finished disclosure and a finished tabs component.

## Tree

```
aria-implementation/
├── SKILL.md
├── README.md
├── references/
│   └── patterns.md
└── examples/
    ├── disclosure.md
    └── tabs.md
```
