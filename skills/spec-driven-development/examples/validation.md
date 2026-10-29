> Fictional example filled for the workshops product. Copy the shape; rewrite the rules for the real project.

# Validation rules

Project rules for every implemented spec. Apply them after the acceptance criteria pass. Every applicable rule must PASS before the spec moves to **Implemented**.

Acceptance criteria prove the feature behaves as written. These rules prove the work also follows the project's stack, structure, style, and content parameters.

## Spec completeness

1. Nothing out of scope was implemented.
2. Open questions from the plan were resolved before coding. No silent guesses remain in the code.
3. `plan.md` exists for that spec. Every plan step was committed and the criteria it cites are marked validated.

## Architecture

4. The app remains React. No new framework or unapproved dependencies.
5. Workshop data stays in the local array under `src/data/`. No new network API without a spec.
6. New source lives under `src/`. `specs/` is documentation only and is not part of the build.
7. Prefer design-system components (`ds-select`, `ds-empty-state`, …). Do not replace a `ds-*` with a one-off control when one exists.

## Style and design

8. Colors and spacing use design tokens. No hardcoded spacing or color when a token exists.
9. No new CSS classes unless the spec or the person asked; reuse existing utilities.
10. UI matches the Figma frame linked in the spec when one exists.

## Language, license, and content

11. Code, identifiers, and documentation are in English. Visible UI labels follow the product copy in the spec.
12. Content stays within the existing workshops dataset and approved assets.
