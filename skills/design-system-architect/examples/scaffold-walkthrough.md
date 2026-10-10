# Scaffold walkthrough

A fictional run. Use it as a shape for the summary you give the user. Do not copy Harbor's placeholder colors into a real product.

## Request

"Create a design system called Harbor for a web app. We do not have brand colors yet. Figma will come later. The owner is the Harbor design team."

## Questions already answered

| Question | Answer |
|---|---|
| Platforms | Web |
| Brand inputs | None. Keep the placeholder brand ramp. |
| Tooling | None yet. JSON first, no docs site. |
| Figma | Not in use. Leave component ids empty. |
| Mode | Scaffold |
| Owner | Harbor design team |

## What the agent did

1. Read `references/reference-architecture.md` and `references/token-layering-and-naming.md`.
2. Copied templates into an empty repo using the copy table. Replaced `{system-name}` with Harbor, `{owner}` with Harbor design team, `{date}` with the day of the run, and `{platforms}` with Web.
3. Did not invent a second palette. Left `color.brand.*` described as a placeholder in the summary.
4. Did not add a Button spec. The user had not named a first component.
5. Ran:

```sh
node scripts/validate-tokens.mjs docs/tokens
```

The command exited 0 with no errors and no warnings.

## Summary returned to the user

Harbor now has a skeleton a teammate can extend:

- Token layers in `docs/tokens/` (core, semantic, composite, dark theme), including `color.action.*` for control fills.
- Vision, token foundation, governance, changelog, CODEOWNERS, `AGENTS.md`, and `CONTRIBUTING.md`.
- Empty component and pattern templates. No product components yet.

Still placeholders:

- `color.brand.*` and `fontFamily.sans` / `fontFamily.mono`.
- Voice examples in `docs/vision/voice-and-tone.md`.
- CODEOWNERS still needs a GitHub user or team before reviews are enforced.
- No docs site and no component code. Ask before adding either.

Suggested next step: name the first three components. The usual start is button, text field, and link. Each one is a copy of `docs/components/_template/` with the accessibility section filled.

Backlog entry left in `docs/governance/decisions-backlog.md`:

```markdown
### [2026-10-10] Brand ramp is still a placeholder

- **Category:** foundation
- **Severity:** high
- **Description:** `color.brand.*` is a neutral starter ramp, not Harbor's brand.
- **Suggested action:** Replace the five brand steps, then check `color.text.inverse` on `color.action.primary` for WCAG 2.2 AA in light and dark.
- **Owner:** Harbor design team
```
