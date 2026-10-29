# Epics

Epics are optional. Spec-driven development does not require this file. Use an epic only when several specs together deliver one larger capability. The specs in an epic do not have to be consecutive numbers.

A spec line is marked done here only after that spec's own completion criteria and `documentation/validation.md` have passed. An epic is done only when every spec listed under it is done and its definition of done is met. A spec that appears in no epic is still specified, planned, and implemented on its own.

## Entry shape

Copy this block under **Epic list** when an epic is needed. Do not invent a name, description, or definition of done: ask if any of them is missing.

```markdown
## Epic: Short name

One or two sentences: the larger capability this epic delivers.

**Status:** in progress

### Definition of done

What is true for the user or the product when this epic is finished.

### Specs

- [ ] `006-slug` — what this spec contributes
- [ ] `008-slug` — what this spec contributes
```

Spec status in the list:

- `[ ]` — not done
- `[x]` — done

When the last open spec of an epic is checked, set **Status** to `done` only if the definition of done is also met. Leave **Status** as `in progress` if the definition of done still fails.

## Epic list

No epics yet.
