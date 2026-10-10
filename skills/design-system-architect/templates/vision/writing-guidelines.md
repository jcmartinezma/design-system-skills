---
title: Writing guidelines
status: draft
owner: {owner}
update: {date}
---

# Writing guidelines

UI copy for {system-name}. Pair with `voice-and-tone.md`.

## Labels

- Actions are verbs: "Save changes", "Create project".
- Prefer one to three words on buttons. Put detail in the surrounding text.
- Icon-only controls still have an accessible name that matches the tooltip.

## Empty states

- Heading: what is empty ("No projects yet").
- Body: one sentence on what to do next.
- One primary action.

## Errors

- Say what happened and what the user can do.
- Do not say "Oops" or "Something went wrong" if you know the cause.
- Keep the field label. Do not rely on color alone.

## Loading

- The accessible name stays the same as the resting control.
- Announce completion through the resulting change (the saved state, navigation, or a status message), not only a spinner.
