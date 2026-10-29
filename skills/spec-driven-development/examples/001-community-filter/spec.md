> Fictional example of a deprecated spec. Replaced by `003-province-filter`. Do not re-validate these criteria: they no longer describe the product.

# Filter workshops by autonomous community

- **Status:** Deprecated
- **Date:** 2026-03-18
- **Replaced by:** 003

## Story

As a neighbor looking for a workshop, I want to filter the list by autonomous community so I can see the ones in my area.

## Acceptance criteria

- [x] **AC-1.** Given the list with workshops from several communities, when I choose "Castilla y León", then I only see workshops from that community.
      Validated: test `filters by community` in `src/pages/Workshops.test.tsx` (pass from 2026-02-02, no longer applies).
- [x] **AC-2.** Given the community filter applied, when I choose "All", then I see all workshops again.
      Validated: test `clears the community filter` in `src/pages/Workshops.test.tsx` (pass from 2026-02-02, no longer applies).

## Technical requirements

- **Stack:** React. The screen was `src/pages/Workshops.tsx`.
- **Design-system components:** `ds-select`.
- **Data and APIs:** local array, `community` field.
- **Performance:** in-memory filter.
- **Accessibility:** accessible name "Autonomous community".
- **Constraints:** the workshop card was not changed.

## Out of scope

- Filter by province.
- Filter by trade.
- Map.

## References

- **Figma:** None.
- **Components:** `ds-select`.
- **Notes:** the filter grain turned out too coarse. A community groups provinces the person cannot visit in the same day.

## Change log

None.

## Deprecation reason

The list now filters by province. A community groups several provinces and these criteria no longer describe what the screen does. They were not rewritten: the filter grain changed, not a detail of the same control. The current spec is 003.
