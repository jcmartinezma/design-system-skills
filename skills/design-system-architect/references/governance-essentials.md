# Governance essentials

Read this when writing process docs or scoring the governance and agent-guidance dimensions.

A design system without owners drifts. Templates are a start. They are not governance until a person is named and the team follows them.

## Required documents

| Document | Job |
|---|---|
| `docs/governance/contribution-model.md` | Who may change what, and the path from proposal to merge |
| `docs/governance/quality-bar.md` | Definition of done for docs, tokens, components, and patterns |
| `docs/governance/versioning.md` | When a change is patch, minor, or major |
| `docs/governance/decisions-backlog.md` | Open gaps. Agents write here instead of inventing a rule |
| `CHANGELOG.md` | User-facing history once the team tags releases |
| `.github/CODEOWNERS` | Who must review token, spec, and governance changes |
| `AGENTS.md` | Read order and hard rules for AI agents |
| `CONTRIBUTING.md` | Human entry point, including how to review agent drafts |

Frontmatter on governance docs: `title`, `status`, `owner`, `update`. Replace `{owner}` with a team or person. `community` or `{owner}` left in place means the doc is still a template.

## Contribution path

1. Look for an existing token, component, or pattern before adding one.
2. For a breaking rename, open a backlog item first.
3. Copy the component or pattern template. Fill every required section.
4. Link the new doc from `docs/README.md`.
5. Self-check against the quality bar.
6. A human owner merges. An agent may draft the diff. The owner is responsible for accuracy and accessibility.

## Versioning

Use semantic versioning for the system as a whole.

| Change | Bump | Example |
|---|---|---|
| Copy fix, or a value tweak that keeps the token name | Patch | Adjust `color.brand.700` |
| New token, component, or theme, still compatible | Minor | Add `color.action.danger` |
| Rename or removal that breaks specs or code | Major | Rename `color.surface.primary` |

Document a breaking token change in the changelog and in the pull request. Link it from the foundation doc that named the old token.

`versioning.md` without a `CHANGELOG.md` is an unfinished process. Create the changelog when the first version is tagged. Until then, keep notable decisions in the backlog and say that releases are not tagged yet.

## Decisions backlog

Entry shape:

```markdown
### [YYYY-MM-DD] Short title

- **Category:** foundation | component | pattern | governance | tooling
- **Severity:** low | medium | high
- **Description:** What is missing or inconsistent?
- **Suggested action:** Next concrete step
- **Owner:** optional
```

Statuses: Open, In progress, Resolved. Resolved entries link to the doc or commit that closed them.

Use the backlog when:

- A spec needs a token that does not exist.
- Two docs disagree.
- An accessibility answer is unknown.
- The team is postponing Storybook, tests, or a second platform.

Do not use it as a place to hide a decision you already wrote into a spec.

## Quality bar (minimum)

- Plain language. Define terms a new teammate would not know.
- No raw color or spacing in specs when a token name exists.
- Every component and pattern has an accessibility section.
- Token JSON passes `scripts/validate-tokens.mjs` with no errors.
- New docs are linked from `docs/README.md`.

## Agent guidance

`AGENTS.md` should tell an agent:

1. Which files to read, and in what order (governance and backlog, vision, foundations, tokens, patterns, components).
2. That git JSON is the source of truth for values.
3. How to add a component (copy `_template`, do not add a loose markdown file).
4. What to do when information is missing: tell the user, then append a backlog entry.
5. Not to generate a full token matrix or a full component library unless asked.

Keep the always-on rule in `.cursor/rules/` short. Point it at `AGENTS.md` rather than duplicating every doc.

## Owners

CODEOWNERS should name at least:

- `docs/tokens/`
- `docs/components/`
- `docs/governance/`
- `AGENTS.md`

If the team has no GitHub org yet, still write the intended owner in the contribution model and log "CODEOWNERS not wired" in the backlog.
