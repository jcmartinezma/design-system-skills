---
title: {Component name}
status: draft
owner: {owner}
update: {date}
---

# {Component name}

Copy this folder to `docs/components/{kebab-case-name}/` and replace every placeholder. Delete a row only when you record why it does not apply.

## Purpose

What job does this component do for the user?

**Use when:**

- …

**Do not use when:**

- … Prefer {other component or pattern}.

## Anatomy

| Part | Required | Description |
|---|---|---|
| Container | Yes | Hit target. Holds padding, fill, border, and radius. |
| Label | Yes, unless icon-only | Names the action or value. |
| Icon | No | Decorative, or reinforces the label. |

## Variants

### Appearance

| Variant | Use |
|---|---|
| Primary | The one main action in the view. |
| Secondary | An alternate action next to primary. |

### Size

| Size | Use |
|---|---|
| Medium | Default. |

Do not add a size that is not in this table.

## States

| State | Behavior |
|---|---|
| Default | Resting and interactive. |
| Hover | Stronger fill or border. Pointer cursor. |
| Active | Pressed appearance while the pointer is down. |
| Focus | Visible focus ring. Keyboard only is acceptable when the design says so. |
| Disabled | Not activatable. Explain whether it stays in the tab order. |
| Loading | If the component can be pending: keep the accessible name, show progress, ignore double activation. |

## Content

Follow `docs/vision/writing-guidelines.md`.

- Label pattern: verb plus object when the control commits an action.
- Length: how many lines before truncation, and where the full text is exposed.
- Loading: the accessible name stays the same as the resting label.

## Accessibility

- **Keyboard:** How it is reached and which keys activate or dismiss it.
- **Focus:** Which token draws the focus ring (`color.border.accent` unless the spec names another).
- **Role:** Native element, or the ARIA role and why native is impossible.
- **Name:** How the accessible name is computed. Icon-only needs an explicit name.
- **Disabled:** `disabled` or `aria-disabled`, and whether activation is ignored.
- **Loading:** `aria-busy` and how completion is announced.
- **Contrast:** WCAG 2.2 AA for text and icons in every appearance, state, and theme that ships.
- **Target size:** Minimum hit area. Say when padding, not the visible box, supplies it.
- **Motion:** Honors `prefers-reduced-motion`. Name the motion token.

## Tokens

Names only. Add a missing token to `docs/tokens/` or log it in the decisions backlog. Do not borrow `color.icon.*` or `color.surface.*` as an action fill.

| Role | Token |
|---|---|
| Fill | `color.action.primary` |
| Fill, hover | `color.action.primary.hover` |
| Label | `color.text.inverse` |
| Border | `color.border.primary` |
| Focus | `color.border.accent` |
| Padding | `spacing.md` |
| Gap | `spacing.xs` |
| Radius | `radius.sm` |
| Label type | `text.label` |
| Motion | `motion.transition.fast` |

## Figma mapping

Leave this section in place even when Figma ids are empty.

### Component properties

| Property | Figma type | Maps to |
|---|---|---|
| Label | TEXT | Visible label |
| Has icon | BOOLEAN | Shows or hides the icon slot |
| Icon | INSTANCE_SWAP | Icon instance. Not one variant per icon. |

### Variant names

```text
Appearance=Primary, Size=Medium, State=Default
```

Hover and focus are interaction states unless the team has a documented reason to variant them.

Bind Semantic variables. Do not paste core hex onto the component.

## Related

- …

## Open questions

Log each item in `docs/governance/decisions-backlog.md`.

- …
