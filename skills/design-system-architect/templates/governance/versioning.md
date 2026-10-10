---
title: Versioning
status: draft
owner: {owner}
update: {date}
---

# Versioning

How {system-name} numbers docs, tokens, and (later) code.

## Docs and tokens

| Change | Bump | Example |
|---|---|---|
| Wording fix, or a value tweak that keeps the token name | Patch | Adjust a brand step |
| New token, theme, component, or pattern that does not break existing names | Minor | Add a text field spec |
| Rename, removal, or a folder move consumers must follow | Major | Rename a semantic color |

## Code

When a package is published, it uses the same numbers. A code release updates the matching spec in the same change.

## Changelog

Record tagged releases in the root `CHANGELOG.md`. If you have not tagged a release yet, say so there and keep unpublished decisions in the decisions backlog.

A breaking token change needs a changelog entry and a note in the foundation doc that mentioned the old name.

## Related

- [Contribution model](contribution-model.md)
- [Decisions backlog](decisions-backlog.md)
