# Contributing to {system-name}

This system is documentation and tokens first. Code components come later, in the same names.

## Start here

- [Documentation map](docs/README.md)
- [Contribution model](docs/governance/contribution-model.md)
- [Quality bar](docs/governance/quality-bar.md)
- [Decisions backlog](docs/governance/decisions-backlog.md)

## Add a component spec

1. Copy `docs/components/_template/` to `docs/components/{kebab-case-name}/`.
2. Fill `metadata.json` and every section of `spec.md`. Accessibility is required.
3. Add a row to `docs/README.md`.

## Add a pattern

1. Copy `docs/patterns/_template.md` to `docs/patterns/{kebab-case-name}.md`.
2. List the components it uses.
3. Add a row to `docs/README.md`.

## Change tokens

1. Edit `docs/tokens/`. Core stays raw. Semantic and theme files stay aliases.
2. Run the token validator from the design-system-architect skill:

   ```sh
   node scripts/validate-tokens.mjs docs/tokens
   ```

   Point the path at your skill install if the script is not in this repo.
3. Note breaking renames in `CHANGELOG.md` and in the decisions backlog before they merge.

## Agent-assisted changes

If an agent drafted the pull request, you still review it. Check token names, accessibility, and that no second palette was invented. The owner is {owner}.

## Questions

Open an issue before large structural changes (renames, new platforms, licensing).
