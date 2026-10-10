# Component spec requirements

Read this when adding a component, reviewing a spec, or scoring the component dimension of an audit.

## Folder

```
docs/components/{kebab-case-name}/
├── metadata.json
└── spec.md
```

Copy both files from `docs/components/_template/`. Do not add a loose `docs/components/{name}.md`. Ignore folders whose names start with `_`.

A **component** is one element (button, text field). A **pattern** combines components for a scenario (empty state, form layout) and lives in `docs/patterns/{kebab-case-name}.md`, copied from `_template.md`.

## metadata.json

```json
{
  "identification": {
    "name": "",
    "nodeId": "",
    "componentKey": "",
    "assetId": "",
    "libraryKey": "",
    "fileKey": ""
  },
  "metadata": {
    "description": "",
    "path": "",
    "page": ""
  }
}
```

Fill Figma ids only from a file the user pointed at. Empty ids are allowed and mean "not linked yet". Do not invent node ids. `metadata.description` is one sentence a teammate can scan.

## spec.md sections

Frontmatter: `title`, `status` (`draft` or `stable`), `owner`, `update` (ISO date).

| Section | Done when |
|---|---|
| Purpose | Says the job, when to use it, and when to use something else |
| Anatomy | Names each part (container, label, icon, and so on) |
| Variants | Lists appearance and size. Each variant has a use. No one-off sizes |
| States | Default, hover, active, focus, disabled, and loading or error when those exist |
| Content | Label pattern, length, and what loading must keep announcing |
| Accessibility | Keyboard, focus, role, accessible name, disabled, loading, contrast, target size, reduced motion |
| Tokens | Semantic or composite names only. No raw hex or px |
| Figma mapping | Which props are component properties and which are variants, plus the variant name format |
| Related | Links to nearby components and patterns |
| Open questions | Points at the decisions backlog instead of hiding a guess in the spec |

## Accessibility bar

Every spec includes all of these, even if the answer is "not applicable" with a reason:

- Keyboard: tab order and keys that activate or dismiss (Enter, Space, Escape).
- Focus: a visible indicator. Removing the outline requires a token-backed replacement (`color.border.accent`).
- Role: native element first. `role="button"` only when a native button is impossible.
- Name: matches the visible label. Icon-only controls need an accessible name.
- Disabled: native `disabled`, or `aria-disabled="true"` when the control stays focusable.
- Loading: `aria-busy="true"` and the same accessible name as the resting control.
- Contrast: text and icons meet WCAG 2.2 AA against the background in every appearance and state that ships, in every theme.
- Target size: at least 24×24 CSS px, and 44×44 when the control is a primary touch target. Padding may enlarge a smaller visual.
- Motion: transitions follow `prefers-reduced-motion`.

## Tokens in the spec

Map roles, not values.

| Role | Prefer |
|---|---|
| Primary action fill | `color.action.primary` and its hover, active, disabled states |
| Secondary action fill | `color.action.secondary` |
| Danger fill | `color.action.danger` |
| Label on a filled action | `color.text.inverse` |
| Label on a quiet action | `color.text.primary` |
| Stroke | `color.border.primary` |
| Focus | `color.border.accent` |
| Padding and gap | `spacing.sm`, `spacing.md`, `spacing.xs` |
| Radius | `radius.sm` or `radius.md` |
| Label type | composite `text.label` |
| Hover motion | `motion.transition.fast` |

If the token does not exist, do not borrow an icon or surface token as a permanent stand-in. Add the action token, or log a backlog item and name the gap in the spec.

## Figma mapping

Keep the variant matrix small.

- Text, booleans, and instance swaps are component properties (label, "has icon", icon swap, loading).
- Appearance, size, and a documented state such as disabled are variants.
- Hover and focus are interaction states. They do not need a variant for every combination.
- Name variants as comma-separated pairs: `Appearance=Primary, Size=Medium, State=Default`.
- Bind fills, strokes, padding, gap, and radius to Semantic variables. Do not paste core hex onto the component.

## Pattern spec

A pattern file needs: problem, solution, when to use, when not to use, composition (component + notes), layout and spacing tokens, responsive behavior, content, states (default, loading, error, empty), accessibility of the whole flow, and open questions.

## Definition of done

- Both component files exist and the spec sections above are filled.
- `docs/README.md` links the new spec.
- Open questions are copied into `docs/governance/decisions-backlog.md`.
- Token names in the spec exist in `docs/tokens/`. Run the validator if you touched JSON.
