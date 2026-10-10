# Sample audit report

Fictional system, included so audit mode has a target shape. Scores below match this story only.

---

# Design system audit: Northstar

## Scope

- Repo inspected on 2026-10-10. Docs and JSON only. No Figma access, no CI logs.
- Found `docs/tokens/core` and `docs/tokens/semantic`, one component at `docs/components/button/`, governance drafts, and `AGENTS.md`.
- Not found: `docs/tokens/theme/`, `docs/tokens/composite/`, `CHANGELOG.md`, `.github/CODEOWNERS`, tests, a token script, Storybook.

## Scores

| Dimension | Score | Evidence |
|---|---|---|
| Foundations and tokens | 2 | DTCG core and semantic files with `$description`. Semantic color has `surface` and `icon` and no `color.action.*`. Button spec points at `color.icon.accent` for the primary fill. |
| Theming | 0 | No `docs/tokens/theme/`. Dark mode is not specified. |
| Components | 1 | `docs/components/button/spec.md` plus `_template`. No other components. Accessibility section is present. |
| Documentation | 2 | `docs/README.md`, vision, and foundation guides exist and link to each other. Several guides still say "add tokens later" while JSON already exists. |
| Patterns | 1 | `docs/patterns/example-empty-state.md` only. Template is unused beyond that example. |
| Governance | 1 | Contribution, quality bar, versioning, and backlog files exist. Frontmatter `owner` is `community`. Backlog body is still the "no entries yet" template. `versioning.md` mentions a changelog; the file is absent. |
| Tooling and quality | 0 | No validator, lint, test, catalog, or visual regression config. |
| AI-agent guidance | 2 | `AGENTS.md` has a read order and a backlog rule. `.cursor/rules/` exists. No CODEOWNERS, so agent pull requests have no required reviewer. |

## Maturity

9/24 — Emerging

## Gaps

| Priority | Gap | Evidence | Suggested change |
|---|---|---|---|
| P0 | Primary button fill is an icon token | `docs/components/button/spec.md` cites `color.icon.accent` | Add `color.action.primary` (plus hover, active, disabled) and point the spec at it |
| P0 | No theme, but the product claims dark mode in the README | `README.md` "Dark mode supported"; `docs/tokens/theme/` not found | Add `theme/dark/color.semantic.json` that only overrides existing semantic paths, or stop claiming dark mode |
| P1 | Versioning without a changelog | `docs/governance/versioning.md` present; `CHANGELOG.md` not found | Add `CHANGELOG.md` before the next tag |
| P1 | Governance is still a template | `owner: community` in four governance files | Set the owner and fill CODEOWNERS |
| P1 | Nothing checks token JSON | No script or CI workflow matches `tokens` | Run a DTCG validator in CI |
| P2 | One component | `docs/components/` contains `button` and `_template` | Spec the next controls the product already ships |
| P2 | No catalog or visual checks | No Storybook config, no screenshot tests | Add them when the first coded component lands |

## Plan

1. Add `color.action.*` and update the button spec. Do not retint `color.icon.accent` to compensate.
2. Either add a dark theme file or remove the dark-mode claim from the README.
3. Name an owner, add CODEOWNERS, and start `CHANGELOG.md`.
4. Put the validator in CI. Treat errors as failing and warnings as review comments.
5. After the token source of truth is stable, spec the next component from the template and only then add a catalog.

## Backlog entries

```markdown
### [2026-10-10] Button fill uses an icon token

- **Category:** foundation
- **Severity:** high
- **Description:** Primary button fill is `color.icon.accent`. Icon color and action fill will diverge as soon as either changes.
- **Suggested action:** Add `color.action.primary` with hover, active, and disabled. Update the button spec and Figma bindings together.
- **Owner:** design system

### [2026-10-10] Dark mode is claimed but has no tokens

- **Category:** foundation
- **Severity:** high
- **Description:** README promises dark mode. There is no theme file and no contrast note.
- **Suggested action:** Add `docs/tokens/theme/dark/color.semantic.json` or correct the README.
- **Owner:** design system
```
