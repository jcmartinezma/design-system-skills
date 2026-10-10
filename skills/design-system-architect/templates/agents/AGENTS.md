# Agent instructions

How an AI agent extends {system-name}. Humans start at `README.md` and `docs/README.md`.

## Read order

1. This file.
2. `.cursor/rules/design-system-core.mdc` when it is present.
3. `docs/governance/quality-bar.md` and `docs/governance/decisions-backlog.md`.
4. `docs/vision/` (principles, voice, writing).
5. `docs/foundations/` and `docs/tokens/`.
6. `docs/patterns/` before inventing a layout.
7. `docs/components/` before inventing a control.

## Source of truth

- Token values live in `docs/tokens/` (DTCG JSON). Do not invent hex, spacing, or type values.
- Core is raw values. Semantic roles alias core. Composites alias semantic or core. `docs/tokens/theme/{mode}/` only overrides semantic paths.
- Component specs use semantic and composite names. Public color names follow `color-{element}-{hierarchy}-{state}`.
- Action fills use `color.action.*`. Do not reuse `color.icon.*` or `color.surface.*` as a button fill.

## When something is missing

1. Tell the user what is missing and what breaks if you guess.
2. Add an entry to `docs/governance/decisions-backlog.md` with date, category, severity, description, and suggested action.
3. Stop that part of the task until the user decides.

## Adding a component or pattern

- Component: copy `docs/components/_template/` to `docs/components/{kebab-case-name}/`. Fill `metadata.json` and every section of `spec.md`, especially accessibility.
- Pattern: copy `docs/patterns/_template.md`.
- Link the new doc from `docs/README.md`.
- Do not add a loose markdown file directly under `docs/components/`.

## Figma

When the user asks to sync tokens, mirror Core and Semantic collections. Composites become styles. Theme folders become modes. Do not create a parallel collection layout.

Leave Figma ids empty until the user supplies a file. Never invent a node id.

## Scope

This repo may be a starter. Extend only what the user asked for. Do not generate a full token matrix or a full component library in one pass.

## Do not

- Hardcode colors or pixels in specs when a token exists.
- Commit secrets or another company's brand assets.
- Merge your own draft. {owner} reviews it.
