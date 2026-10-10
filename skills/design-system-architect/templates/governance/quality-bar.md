---
title: Quality bar
status: draft
owner: {owner}
update: {date}
---

# Quality bar

Definition of done for {system-name}.

## Every doc

- [ ] Frontmatter has `title`, `status`, `owner`, and `update`
- [ ] Owner is a real team or person, not a placeholder
- [ ] Plain language, with terms explained
- [ ] Linked from `docs/README.md` if it is new
- [ ] No raw hex or px where a token name exists

## Tokens

- [ ] Values live in `docs/tokens/` and follow core → semantic → composite → theme
- [ ] `node scripts/validate-tokens.mjs docs/tokens` reports no errors (use the design-system-architect skill script, or the copy your repo adopts)
- [ ] New semantic color roles use `color-{element}-{hierarchy}-{state}`
- [ ] Action fills use `color.action.*`, not icon or surface tokens

## Components

- [ ] Folder copied from `docs/components/_template/` (`metadata.json` and `spec.md`)
- [ ] Purpose, anatomy, variants, states, content, tokens, and Figma mapping are filled
- [ ] Accessibility section covers keyboard, focus, name, contrast, target size, and motion

## Patterns

- [ ] Copied from `docs/patterns/_template.md`
- [ ] Names the components it composes
- [ ] Covers responsive behavior plus loading, empty, and error
- [ ] Accessibility section covers the flow, not a single control

## Review

- [ ] Matches `docs/vision/design-principles.md`
- [ ] Does not duplicate another doc without a link
- [ ] Open questions are in the decisions backlog
