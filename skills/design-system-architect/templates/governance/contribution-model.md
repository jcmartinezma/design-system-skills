---
title: Contribution model
status: draft
owner: {owner}
update: {date}
---

# Contribution model

How changes land in {system-name}.

## Roles

- **Owner ({owner})** merges changes to tokens, components, patterns, and these governance docs.
- **Contributors** open a pull request after checking existing docs.
- **Agents** may draft the diff. They do not merge, and they do not invent a rule that contradicts this folder.

## Path

1. Search `docs/` and `docs/tokens/` before adding a new guide or token.
2. Open a decisions-backlog item first when the change renames or removes a token or component.
3. Copy `docs/components/_template/` or `docs/patterns/_template.md` for new specs.
4. Link the new page from `docs/README.md`.
5. Check `quality-bar.md` before asking for review.
6. The owner reviews accuracy, accessibility, and token names.

## Size of change

| Change | Path |
|---|---|
| Clarify wording | Pull request |
| New component or pattern | Pull request plus a row in `docs/README.md` |
| New token that keeps old names working | Pull request plus a changelog note when you tag releases |
| Rename or removal | Backlog item first, then a major version note |

## Related

- [Quality bar](quality-bar.md)
- [Versioning](versioning.md)
- [Decisions backlog](decisions-backlog.md)
