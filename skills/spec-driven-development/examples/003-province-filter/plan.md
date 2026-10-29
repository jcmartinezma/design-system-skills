> Fictional example of a confirmed plan. In a real plan the questions start as `pending` and are filled with the person.

# Plan: Filter workshops by province

- **Spec:** `specs/003-province-filter/spec.md`
- **Date:** 2026-03-18
- **Confirmed:** yes

## Steps

1. **Data and province select** — AC-1
   - Files: `src/data/workshops.ts`, `src/pages/Workshops.tsx`, `src/pages/Workshops.test.tsx`
2. **"All" option** — AC-2
   - Files: `src/pages/Workshops.tsx`, `src/pages/Workshops.test.tsx`
3. **Empty state** — AC-3
   - Files: `src/pages/Workshops.tsx`, `src/pages/Workshops.test.tsx`, story `Workshops/no results`
4. **Accessible name and keyboard check** — AC-4
   - Files: `src/pages/Workshops.tsx`, story `Workshops/with filter`

## Affected files

- `src/data/workshops.ts` — modify (`province` field)
- `src/pages/Workshops.tsx` — modify
- `src/pages/Workshops.test.tsx` — create
- Story `Workshops/with filter` and `Workshops/no results` — create

## Questions before implementing

| # | Topic | Question | Answer | Where it landed |
|---|---|---|---|---|
| 1 | Edge cases | What if a record has no province? | Those workshops only appear under "All". Do not invent a province. | Technical requirements. Notes. |
| 2 | Empty, error, loading | Is there an empty, error, or loading state? | Empty yes, with fixed copy. Data is local: no network error or loading. | AC-3. Out of scope: map and API. |
| 3 | Permissions | Should any role be blocked from filtering? | No. The list is public. | Out of scope. |
| 4 | Mobile | Does the filter change control on a narrow screen? | No. `ds-select` works at both sizes. | Technical requirements. |
| 5 | Accessibility | Can the select be operated with keyboard only, and what is it called? | Yes. The name is "Province". | AC-4. |
| 6 | Technical detail | Does the chosen province stay in the URL? | No. | Out of scope. |

## Impact on earlier specs

| Spec | Criterion | Why | Action |
|---|---|---|---|
| 001 | AC-1, AC-2 | The list will filter by province. The autonomous-community criteria will stop describing the screen. Same page: `src/pages/Workshops.tsx`. | Deprecate. `Replaced by: 003`. |

## Confirmation

- [x] The person has read the plan and the answers are already applied to the spec.
