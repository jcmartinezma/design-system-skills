---
name: aria-implementation
description: >-
  Specifies and implements one accessible interactive component for a design
  system. Starts from native HTML, maps the component to a WAI-ARIA APG
  pattern, and returns an accessibility spec, implementation code, and a
  self-check. Use when building or specifying a button, link, disclosure,
  accordion, dialog, tooltip, popover, tabs, menu, navigation, listbox,
  combobox, switch, checkbox, radio, alert, status, breadcrumb, or carousel
  in HTML, React, or web components.
---

# ARIA implementation

Specify and implement one interactive component so the accessibility tree matches what people see, and the keyboard matches the [APG](https://www.w3.org/WAI/ARIA/apg/patterns/) pattern.

ARIA updates the accessibility tree. It does not add keyboard behavior, mouse behavior, or CSS. A role is a promise the script and the styles have to keep. No ARIA is better than bad ARIA: omit a role you will not implement.

## When to use it

- The user is implementing or specifying an interactive component.
- The user asks which role, name, state, or keys a component needs.

Do not use it to audit existing code, a diff, or a rendered page. That is `aria-review`. Do not invent a role for a widget that matches no APG pattern.

## Steps

1. Write the job of the component in one sentence. Ask only what is still unknown: does it navigate or act, and does any popup contain a control?
2. Pick native HTML from [references/patterns.md](references/patterns.md). If a native element does not fit, write the reason in the spec before adding a role.
3. Pick one APG pattern. Do not mix them. A tab is not a link. Site navigation is not a menu. A popup that contains a button is not a tooltip.
4. Set the accessible name with the order in Rules. Prefer the visible label.
5. Map every visual state to one ARIA state. The script updates that attribute when the visual changes.
6. Copy the keyboard and focus behavior from the pattern reference, including where focus goes on open and on close.
7. If text appears and focus does not move, name the live region. The region node is in the DOM before the text changes.
8. Fill the output format, then the code, then the self-check. Mark each self-check line pass or name the gap.

Read [examples/disclosure.md](examples/disclosure.md) and [examples/tabs.md](examples/tabs.md) before writing. Match that shape.

## Rules

Native host language first. The [four rules of ARIA](https://www.w3.org/TR/using-aria/) still govern authoring. W3C has discontinued that note; the [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) is the maintained statement of the same idea.

1. Use a native element or attribute when it already has the semantics and behavior (`button`, `a`, `input`, `select`, `textarea`, `label`, `fieldset`, `details`/`summary`, `dialog`).
2. Do not replace native semantics. `role="button"` on an `h2`, or `role="navigation"` on a `ul`, throws away the heading or the list. Put the role on a wrapper, or use the native element.
3. Every interactive control is operable by keyboard, with the keys for its pattern.
4. Do not put `aria-hidden="true"`, `role="presentation"`, or `role="none"` on a focusable element or on an ancestor of one. [`presentation` on a focusable element is ignored](https://www.w3.org/TR/wai-aria-1.2/#presentation) by the user agent, and `aria-hidden` on a focused control leaves some people on an empty object.

Accessible name, first match wins ([AccName 1.2](https://www.w3.org/TR/accname-1.2/), [APG names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)):

1. `aria-labelledby`
2. `aria-label`
3. Native label or content (`label`, `alt`, `caption`, or the text inside roles that name from content, such as button, link, and tab)
4. `title`
5. `placeholder` on `input` and `textarea` only, after `title`

`aria-label` and `aria-labelledby` on a button, link, or tab replace the inner text for assistive technologies, unless `aria-labelledby` also points at that text. The visible text must be in the accessible name ([WCAG 2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), AA). Icon-only controls need an explicit name. Do not use `title` or `placeholder` as the label.

| Visual state | Attribute | Wrong attribute |
|---|---|---|
| Panel open or closed | `aria-expanded` `true`/`false` | `aria-pressed` |
| Tab or option selected | `aria-selected` `true`/`false` | `aria-pressed` |
| Checkbox, radio, switch, or menu check | `aria-checked` `true`/`false`. `mixed` only on a checkbox or `menuitemcheckbox` | `aria-pressed` |
| Toggle button, label stays the same | `aria-pressed` `true`/`false` (`mixed` only if a third visual state exists) | `aria-checked` |
| Current item in a set | `aria-current` `page`/`step`/`location`/`date`/`time`/`true` | `aria-selected`, unless it is a tab |
| Invalid value | `aria-invalid="true"` plus the error id | Color alone |
| Unavailable, removed from tab order | HTML `disabled` | `aria-hidden` |
| Unavailable, still focusable | `aria-disabled="true"` and ignore activation | HTML `disabled` |
| Loading, name unchanged | `aria-busy="true"` | A new accessible name |
| Controls another element | `aria-controls` the id | `aria-owns`, unless the DOM parent is wrong |
| Opens a popup | `aria-haspopup` `menu`/`listbox`/`tree`/`grid`/`dialog` | A value of `tooltip`. `true` means `menu` |

`aria-expanded`, `aria-selected`, `aria-checked`, and `aria-pressed` are not interchangeable. Omit `aria-expanded` when the control does not show or hide anything.

Keyboard and focus:

- Tab order follows the DOM. Do not use `tabindex` greater than `0`.
- One widget, one tab stop. Inside a composite (tabs, menu, listbox, radio group), move with the pattern's arrows using a [roving `tabindex`](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) or `aria-activedescendant`. Roving `tabindex` puts DOM focus on the item. `aria-activedescendant` leaves DOM focus on the container (or the combobox input) and points at the active id.
- A modal dialog moves focus inside on open, cycles Tab inside, closes on Escape, and returns focus to the invoker. Set `aria-modal="true"` only when the rest of the page is actually inert.
- Show keyboard focus with `:focus-visible`. Do not remove the outline without a replacement. [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) (AA) requires a visible indicator. [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (AA) requires 3:1 against adjacent colors for the indicator that identifies the state. [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) (AA) requires the focused component not be fully covered by author content such as a sticky header. [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) (AAA) asks for an indicator at least as large as a 2 CSS px perimeter and a 3:1 change between the focused and unfocused pixels. If the system has a focus color token, use it.

Live regions:

- `role="alert"` is assertive and atomic. Use it for important, time-sensitive text. It does not receive focus. If the user must stop and respond, use `role="alertdialog"`.
- `role="status"` is polite and atomic. Use it for advisory text such as "Saved". It does not receive focus because the text changed.
- Mount the region first, then change its text. The [ARIA `aria-errormessage` example](https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage) keeps the live container in the initial DOM and only reveals the message.
- Do not set `aria-live="polite"` on `role="alert"`. The role already sets the politeness.

HTML, React, and web components:

- In JSX, pass ARIA through as `aria-expanded={open}`. Pair labels with `htmlFor`. A `div` with `onClick` is not a control.
- In a shadow root, `delegatesFocus` sends focus to the inner control. `aria-labelledby`, `aria-describedby`, `aria-controls`, and `aria-activedescendant` id references are unreliable across shadow roots. Keep the referenced node in the same root, or set the name on the host.

If you are filling a component spec, also record contrast, target size, and reduced motion. This skill does not decide those.

## Output

```markdown
## Accessibility spec: {Component}

- **Pattern:** APG pattern name and URL
- **Element / role:** Native element, or the role and why native HTML does not fit
- **Name:** How it is computed, and the visible text it must include
- **States:** Visual state → attribute → values
- **Properties:** aria-controls, aria-haspopup, aria-describedby, and any required ids
- **Keyboard:**

  | Key | When focus is | Result |
  |---|---|---|
  | | | |

- **Focus:** Where focus moves on open, close, and Tab
- **Announcements:** Live region role, or "none"

## Implementation

{HTML, React, or web component code that does the keyboard and state updates}

## Self-check

- [ ] Native element, or the reason is in the spec
- [ ] Role matches one APG pattern, and the keys match that pattern
- [ ] Accessible name includes the visible text
- [ ] Each visual state updates one ARIA state, and the states are not mixed
- [ ] Referenced ids exist in the same root
- [ ] Focus indicator is visible and the focused control is not fully covered
- [ ] Dialog focus moves in, stays in, leaves on Escape, and returns
- [ ] No aria-hidden or presentation on a focusable element or its ancestor
- [ ] Live region, if any, was mounted before its text changed
- [ ] ARIA was not used to create behavior or styles
```

Write "not applicable" with a reason for a row that does not apply. Do not leave it blank.

## When to read each file

| Read it when | File |
|---|---|
| You choose a pattern or write keyboard, roles, or states | [references/patterns.md](references/patterns.md) |
| You want a finished disclosure spec and component | [examples/disclosure.md](examples/disclosure.md) |
| You want a finished tabs spec and component | [examples/tabs.md](examples/tabs.md) |

## Sources

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) — roles, states, properties. Combobox structure, `alert`/`status` implicit live values, `aria-errormessage`, `presentation` on focusable elements.
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — [patterns](https://www.w3.org/WAI/ARIA/apg/patterns/), [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/), [names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/), [keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).
- [Using ARIA](https://www.w3.org/TR/using-aria/) — the four rules. Discontinued draft; do not treat the rest of that note as maintained.
- [Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) — native elements first; do not repeat an implicit role.
- [WCAG 2.2 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/): [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html), [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html), [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
