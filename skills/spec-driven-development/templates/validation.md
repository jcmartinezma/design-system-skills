# Validation rules

Project rules for every implemented spec. Apply them after the acceptance criteria pass. Every applicable rule must PASS before the spec moves to **Implemented**.

Acceptance criteria prove the feature behaves as written. These rules prove the work also follows the project's stack, structure, style, and content parameters.

## Spec completeness

1. Nothing out of scope was implemented.
2. Open questions from the plan were resolved before coding. No silent guesses remain in the code.
3. `plan.md` exists for that spec. Every plan step was committed and the criteria it cites are marked validated.

## Architecture

4. The app remains {STACK_CONSTRAINT}.
   <!-- e.g. React + Vite. No new framework or unapproved dependencies. -->
5. {DATA_ACCESS_RULE}
   <!-- e.g. Domain data uses the existing data layer. No ad-hoc fetches. -->
6. {SOURCE_LAYOUT_RULE}
   <!-- e.g. New source under src/; specs/ is not part of the build. -->
7. {UI_ARCHITECTURE_RULE}
   <!-- e.g. Prefer design-system components (ds-*). No one-off primitives when a ds-* exists. -->

## Style and design

8. {TOKEN_OR_STYLE_RULE}
   <!-- e.g. Colors and spacing use design tokens. No hardcoded values when a token exists. -->
9. {CSS_CHANGE_POLICY}
   <!-- e.g. No new CSS classes unless asked; reuse existing utilities. -->
10. {DESIGN_SOURCE_RULE}
    <!-- e.g. UI matches the Figma frame linked in the spec when one exists. -->

## Language, license, and content

11. Code, identifiers, UI copy, data labels, and documentation follow the project language policy.
12. {LICENSE_OR_CONTENT_RULE}
    <!-- e.g. Content stays within approved licenses / existing app content. -->

<!--
Replace every {PLACEHOLDER} with a checkable rule for THIS project.
Add or remove numbered rules as needed.
Keep them observable: a reviewer must be able to say PASS or FAIL.
Delete this comment block after filling.
-->
