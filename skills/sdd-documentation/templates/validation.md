# Validation rules

Apply these validation rules after a spec is implemented. Every single applicable validation rule must PASS.

## Spec completeness

1. Nothing out of scope was implemented.
2. Open questions were resolved in the spec before coding. No silent guesses remain in the code.
3. `plan.md` and `tasks.md` exist for that spec. Every task checkbox is complete and its **Done when** criteria are met.

## Architecture

4. The app remains {{STACK_CONSTRAINT}}. No new framework, undocumented stack, or unapproved new dependencies.
5. {{DATA_ACCESS_RULE}}
   <!-- e.g. Domain data uses ES6 import/export. No global namespace mappings. -->
6. {{SOURCE_LAYOUT_RULE}}
   <!-- e.g. New source under src/; static under public/; documentation/ not in the build. -->
7. {{UI_ARCHITECTURE_RULE}}
   <!-- e.g. UI components without Shadow DOM; orchestrators vs presentational split. -->

## Style and design

8. {{TOKEN_OR_STYLE_RULE}}
   <!-- e.g. Colors use design tokens / CSS variables. No hardcoded colors. -->
9. {{CSS_CHANGE_POLICY}}
   <!-- e.g. No new CSS classes unless the user asked; reuse existing classes. -->
10. {{DESIGN_SOURCE_RULE}}
    <!-- e.g. UI matches the design library / Figma when applicable. -->

## Language, license, and content

11. Code, identifiers, UI copy, data, and documentation are in English.
12. {{LICENSE_OR_CONTENT_RULE}}
    <!-- e.g. Content must stay within approved licenses / existing app content. -->

<!--
Add or remove numbered rules to match AGENTS.md for THIS project.
Keep them observable: a reviewer must be able to say PASS or FAIL.
-->
