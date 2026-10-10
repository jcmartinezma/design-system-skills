---
title: Documentation
status: draft
owner: {owner}
update: {date}
---

# {system-name} documentation

Map of the design system for {platforms}. Agents start at the root `AGENTS.md`.

## Path

1. Vision — principles, voice, writing
2. Foundations and tokens — rules and values
3. Components and patterns
4. Governance — how the system changes

## Vision

| Doc | Purpose |
|---|---|
| [Design principles](vision/design-principles.md) | How to choose when two options look fine |
| [Voice and tone](vision/voice-and-tone.md) | Personality and tone by situation |
| [Writing guidelines](vision/writing-guidelines.md) | Labels, empty states, errors |

## Foundations

Guides explain usage. Values live in [tokens](tokens/).

| Doc | Purpose |
|---|---|
| [Tokens](foundations/tokens.md) | Layers, names, and the CSS build |

Add color, type, spacing, motion, and accessibility guides as those decisions are made. Link them here.

## Components

One folder per component (`metadata.json` and `spec.md`). Copy [components/_template](components/_template/) to add one. Folders starting with `_` are not components.

| Doc | Purpose |
|---|---|
| _None yet._ | |

## Patterns

| Doc | Purpose |
|---|---|
| [_template.md](patterns/_template.md) | Starting point for a pattern |

## Governance

| Doc | Purpose |
|---|---|
| [Contribution model](governance/contribution-model.md) | Who changes what |
| [Quality bar](governance/quality-bar.md) | Definition of done |
| [Versioning](governance/versioning.md) | Patch, minor, major |
| [Decisions backlog](governance/decisions-backlog.md) | Open questions |

## When you add a doc

1. Link it in this file.
2. Meet the quality bar.
3. If the docs site has a hand-written nav, update it. Component folders should be discovered, not hardcoded, once a site exists.
