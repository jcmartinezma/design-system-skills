> Fictional example. Copy the shape, not this workshop list. Real specs live under `specs/` in the product repo.

# Filter workshops by province

- **Status:** Implemented
- **Date:** 2026-03-18
- **Replaces:** 001

## Story

As a neighbor looking for a workshop, I want to filter the list by province so I only see the ones I can visit.

## Acceptance criteria

- [x] **AC-1.** Given the list with workshops from several provinces, when I choose "León" in Province, then I only see workshops from León.
      Validated: test `filters by León` in `src/pages/Workshops.test.tsx`.
- [x] **AC-2.** Given the filter with "León" applied, when I choose "All", then I see all workshops again.
      Validated: test `resets with All` in `src/pages/Workshops.test.tsx`.
- [x] **AC-3.** Given I choose a province with no workshops, when the filter applies, then I see the empty state with the text "No workshops in this province" and no cards.
      Validated: test `shows the empty state` and review of the `Workshops/no results` story in Storybook.
- [x] **AC-4.** Given the filter, when I reach it with the keyboard, then the control is announced as "Province", I can choose an option without a mouse, and the list updates.
      Validated: in the browser, story `Workshops/with filter`, Tab to reach it, arrows to move, Enter to choose.

## Technical requirements

- **Stack:** React. The screen is `src/pages/Workshops.tsx`.
- **Design-system components:** `ds-select` for the province and `ds-empty-state` for AC-3. The workshop card is not changed.
- **Data and APIs:** local array `src/data/workshops.ts`, with the `province` field. No new API.
- **Performance:** in-memory filter. The reference list has fewer than 200 workshops. No virtualization.
- **Accessibility:** the select's accessible name is the visible text "Province". See AC-4.
- **Constraints:** do not change the card design or the alphabetical order of the unfiltered list.

## Out of scope

- Filter by trade.
- Persist the province in the URL.
- Map.
- Permissions. The list is public.

## References

- **Figma:** https://www.figma.com/design/exampleWorkshops/list?node-id=12-4 (frame "Province filter"; example link, not a real file).
- **Components:** `ds-select`, `ds-empty-state`.
- **Notes:** "All" is the first option and the initial value. No province is remembered between visits.

## Change log

- 2026-03-21 — Extracted the select to `src/components/ProvinceFilter.tsx`. Same behavior.
- 2026-03-28 — Moved the select closer to the list with the `spacing.sm` token. Same flow.
