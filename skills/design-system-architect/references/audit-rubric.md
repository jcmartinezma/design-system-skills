# Audit rubric

Read this at the start of audit mode. Score only what you can show. A missing folder is a finding. A hunch is not.

## Dimensions

Score each from 0 to 3.

| Score | Meaning |
|---|---|
| 0 | Absent. Nothing in the repo covers this. |
| 1 | Started. A template, a single example, or a placeholder owner. |
| 2 | Usable. A team could build with it, and known gaps are listed. |
| 3 | Maintained. Named owners, validation, and a history of updates. |

| Dimension | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Foundations and tokens | No shared values | A palette or a JSON file, layers mixed | Core and semantic DTCG with descriptions and aliases | Layers are valid, documented, and checked in CI |
| Theming | One appearance, undocumented | A dark sketch or hardcoded overrides | A theme file that only overrides semantic roles | Modes stay in sync and are checked for contrast |
| Components | None | A template or a single spec | The specs people actually ship, with anatomy, states, and accessibility | Specs match code or Figma, and new ones follow the template |
| Documentation | README only | Scattered notes | Vision, foundations, and a doc map | Docs are current, linked, and written for a new teammate |
| Patterns | None | One example | Patterns for the real recurring screens | Patterns cite components and cover empty, error, and responsive |
| Governance | None | Template text, owner still a placeholder | Contribution, quality bar, versioning, and a backlog people use | Named owners, CODEOWNERS, changelog matches releases |
| Tooling and quality | No checks | A build exists, nothing fails a bad token | Token validation or lint runs locally | CI validates tokens; catalog and visual checks cover UI that ships |
| AI-agent guidance | None | A loose prompt | `AGENTS.md` with read order, source of truth, and a backlog rule | Rules are scoped, and agent edits are reviewed by owners |

## Maturity

Add the eight scores (maximum 24).

| Total | Label |
|---|---|
| 0–6 | Early |
| 7–12 | Emerging |
| 13–18 | Established |
| 19–24 | Mature |

The label is a summary. The plan comes from the gaps, not from the label.

## Early-system signals

Look for these on purpose. They are common when a starter was copied and not finished:

- Only one component spec, plus a template.
- Semantic color has `surface` and `icon` but no `action`, so buttons reuse the wrong role.
- `versioning.md` exists and `CHANGELOG.md` does not.
- No token validator, no tests, no linter.
- Specs only: no implemented components, no Storybook (or other catalog), no visual regression.
- Frontmatter `owner` is still `community`, `{owner}`, or empty.
- No CODEOWNERS and no named reviewer.
- Decisions backlog is the empty template.
- Theme file duplicates core hex, or adds names that do not exist in semantic.
- Agent docs contradict the token files.

A signal is a P1 by default. Raise it to P0 when it causes inaccessible UI or blocks the team from sharing one source of truth.

## Priorities

| Priority | Use when |
|---|---|
| P0 | People can ship the wrong color, miss a contrast target, or cannot tell which file is authoritative |
| P1 | Structure is unfinished: missing action tokens, no changelog, no validation, placeholder owners |
| P2 | Scale: more components, a catalog, visual regression, extra platforms |

## Output format

Write the report in this shape. Keep evidence as paths, command output, or "not found".

```markdown
# Design system audit: {name}

## Scope
- Repo and date
- What was inspected
- What was not opened (no Figma access, no CI logs, and so on)

## Scores
| Dimension | Score | Evidence |
|---|---|---|
| Foundations and tokens | | |
| Theming | | |
| Components | | |
| Documentation | | |
| Patterns | | |
| Governance | | |
| Tooling and quality | | |
| AI-agent guidance | | |

## Maturity
{total}/24 — {label}

## Gaps
| Priority | Gap | Evidence | Suggested change |
|---|---|---|---|
| P0 | | | |

## Plan
1. ...
2. ...

## Backlog entries
Draft entries the user can paste into `docs/governance/decisions-backlog.md`.
```

## How to inspect

1. List the repo. Note token formats (DTCG, Style Dictionary, CSS variables only, Tokens Studio).
2. If DTCG files match this architecture, run `node scripts/validate-tokens.mjs <tokens-dir>` from this skill and quote the summary.
3. Open one component spec end to end. Do not assume the others match. Sample two more if many exist.
4. Search for `owner:`, `CHANGELOG`, `CODEOWNERS`, `AGENTS.md`, `.cursor/rules`, Storybook config, and test scripts.
5. Separate "file exists" from "file is still a template".

Do not raise a score because a file is long. Raise it because a teammate can act on it and a check would catch a regression.
