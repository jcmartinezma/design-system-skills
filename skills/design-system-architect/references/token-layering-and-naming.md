# Token layering and naming

Read this when creating tokens, editing tokens, or judging a token set during an audit.

## Format

Use [DTCG](https://www.designtokens.org/tr/2025.10/format/) JSON.

- Every file sets `$schema` to `https://www.designtokens.org/tr/2025.10/format/`.
- A token is an object with `$value`. Groups nest tokens.
- `$type` sits on the token or on a parent group (`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `strokeStyle`, `typography`, `shadow`, `border`, `transition`).
- Every token has a `$description` that includes its public name and what it is for.
- An alias is a string: `{color.neutral.900}`. Paths are dotted. Do not point at a file name.

## Layers

| Layer | Folder | Holds | Must not hold |
|---|---|---|---|
| Core | `docs/tokens/core/*.core.json` | Raw values: hex, px, ms, one font family name, cubic-bezier arrays | Aliases, role names like "primary button" |
| Semantic | `docs/tokens/semantic/*.semantic.json` | UI roles that alias core | Raw hex or px, component names |
| Composite | `docs/tokens/composite/*.composite.json` | Multi-value styles (type, shadow, border, transition) that alias semantic or core | A new palette |
| Theme | `docs/tokens/theme/{mode}/*.semantic.json` | Mode overrides of semantic tokens | New roles that do not exist in semantic, a second copy of the core ramp |

File names follow the layer: `color.core.json`, `color.semantic.json`, `typography.composite.json`.

## Color names

Public pattern:

```text
color-{element}-{hierarchy}-{state}
```

| Piece | Values to start with | Meaning |
|---|---|---|
| element | `bg`, `surface`, `action`, `text`, `border`, `icon`, `shadow` | What the color paints |
| hierarchy | `primary`, `secondary`, `success`, `warning`, `danger`, `accent`, `inverse` | Emphasis or status |
| state | omitted for default, then `hover`, `active`, `disabled` | Interaction |

Default state is stored as `$root` and dropped from the public name.

```text
color.action.primary.$root   →  color-action-primary
color.action.primary.hover   →  color-action-primary-hover
```

`bg` is the page. `surface` is a container on the page (card, panel, banner). `action` is the fill of a control that commits an action. `icon` is for icons. Do not point a button fill at `color.icon.*` or `color.surface.*` because those roles are missing an action token. Add `color.action.*` instead.

Core ramps use a family and a step, not a role: `color.neutral.100`, `color.brand.700`. Steps in a family stay on one scale (for example 100, 300, 500, 700, 900). `color.white`, `color.black`, `color.transparent`, and `color.alpha.*` are global constants.

Replace `color.brand.*` with the user's palette before calling the system branded. Until then, label it a placeholder in the summary.

## Other names

| Category | Core | Semantic | Composite |
|---|---|---|---|
| Space | `spacing.100` (4px steps) | `spacing.xs` … `spacing.xl` | — |
| Radius | `radius.100` | `radius.sm`, `radius.md`, `radius.full` | — |
| Type | `fontFamily.sans`, `fontSize.100`, `fontWeight.400` | `text.style.base`, `text.size.md`, `text.weight.bold` | `text.heading.1`, `text.body`, `text.label` |
| Motion | `duration.100`, `easing.100` | `motion.speed.fast`, `motion.easing.standard` | `motion.transition.fast` |
| Border | `border-width.100`, `border-style.solid` | color only, via `color.border.*` | `border.default` |
| Shadow | `shadow.offset.100`, `shadow.blur.100` | tint via `color.shadow.*` | `shadow.sm` |

`fontFamily` is a single family name. A CSS stack (`Inter, system-ui, sans-serif`) breaks tools that expect one family. Put the stack in product CSS if you need it.

Hyphenated groups stay hyphenated: `border-width.100`, not `borderWidth.100`.

## Theme rules

- Add a folder per mode: `theme/dark/color.semantic.json`.
- Override the semantic public path. Do not duplicate the whole core file.
- Every theme path must already exist in `semantic/`. A dark-only name is an orphan.
- Non-color roles may stay on the light alias until a mode truly needs its own value.

## Descriptions

Write the public name and a short job:

```json
"$description": "color-action-primary — fill for the main call to action"
```

A description that only repeats the hex does not help the next editor.

## Checks

From the skill directory:

```sh
node scripts/validate-tokens.mjs path/to/docs/tokens
```

Errors should be fixed before a scaffold is called done. Warnings (missing description, no `color.action`, no theme file) belong in the audit report even when the script exits 0.

The validator does not check WCAG contrast. Call that out when an audit claims accessible color. Contrast is a separate task: check text and icon tokens against the surfaces they sit on, including disabled and dark mode.

## Adding a token

1. Put the raw value in core if it does not exist.
2. Add or reuse a semantic role. Do not add a component name (`color.button.primary`) in this layer.
3. Point the component spec at the semantic or composite name.
4. If the role changes between modes, add the same path under each theme file.
5. Update `docs/foundations/tokens.md` when you add a file.
6. Re-run the validator.
