---
name: aria-review
description: >-
  Reviews component code, a pull request diff, or a rendered page for ARIA
  and keyboard accessibility. Returns a findings table with severity, WCAG
  success criterion, location, problem, and a fix, then a pass or fail
  verdict per component. Use when auditing an existing component, reviewing
  a change, or checking a rendered control against the APG patterns.
---

# ARIA review

Review one component, a diff, or a rendered control. Report what a keyboard user and an assistive technology user actually get.

No ARIA is better than bad ARIA. The [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) states it this way: roles, states, and properties are the styling language of assistive technologies. A wrong role misrepresents the screen. A role is a promise of keyboard behavior, and ARIA does not fulfill that promise by itself.

## When to use it

- The user wants a review, an audit, or a PR check of ARIA, names, states, or keyboard behavior.
- The user pastes component code or points at a rendered page.

Do not use it to design a component that does not exist yet. That is `aria-implementation`. Do not score contrast, target size, or reading order beyond what the steps below name.

## Severity

| Severity | Use it when |
|---|---|
| Blocker | The action cannot be completed from the keyboard, focus is trapped or lost, a control or dialog has no accessible name, or `aria-hidden` hides the focused control |
| Major | The role is the wrong pattern, a state does not follow the visual, the visible label is missing from the name, a required attribute is missing or points at a missing id, or the focus indicator is absent |
| Minor | Redundant role, `title` or `placeholder` used as the only name, an optional attribute is missing, the live region is noisier than it needs to be, or only the AAA focus-appearance criterion fails |

Verdict for a component: **Pass** when it has no Blocker and no Major. **Fail** otherwise. The review fails if any component fails.

## Steps

1. **Inventory.** List every interactive element and the APG pattern it should be. When the visual and the role disagree, record a finding. Pattern choice and the expected keys are in [references/expected-behavior.md](references/expected-behavior.md).
2. **Native first.** Flag a `div` or `span` with `role="button"`, a click handler on a non-interactive element, a redundant role (`role="button"` on `button`), and a role that overrides a native one (`role="navigation"` on `ul`, `role="menu"` on a site nav).
3. **Names.** Every focusable control and every dialog has a name. Compare it to the visible text ([2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), AA). Precedence is `aria-labelledby`, then `aria-label`, then the native label or content, then `title`. `title` and `placeholder` are fallbacks, not labels. On a button, link, or tab, `aria-label` replaces the inner text.
4. **Attributes.** Required states for the role are present. Values are legal (`aria-expanded` is `true` or `false`, not `expanded`). Every id in `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-activedescendant`, and `aria-errormessage` exists in the same root. `aria-errormessage` is only exposed when `aria-invalid` is not `false`.
5. **State sync.** Operate the control. `aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-current`, `aria-invalid`, and `aria-disabled` change with the visual. A hardcoded `true` is a finding. `aria-pressed`, `aria-checked`, `aria-selected`, and `aria-expanded` are not substitutes for each other.
6. **Keyboard and focus management.** Compare the keys with the expected-behavior table. Check Tab order, roving `tabindex` or `aria-activedescendant`, and, for a dialog, focus in, Tab cycle, Escape, and focus return. `tabindex` greater than `0` is a finding. A composite role (`tab`, `menu`, `listbox`, `radio`) promises that pattern's keys. Missing keys are a 2.1.1 Blocker when there is no other way to reach and activate the control. They are a 4.1.2 Major when each item is already a working button or link and the failure is the promised key model or a state that does not update.
7. **Focus visible.** Keyboard focus shows an indicator (`:focus-visible`). `outline: none` with no replacement fails [2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) (AA). The indicator that identifies the state needs 3:1 against adjacent colors ([1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), AA). The focused component is not fully covered by sticky author content ([2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html), AA). A thin or low-contrast change that fails only [2.4.13](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) (AAA) is Minor unless the product claims AAA.
8. **Hidden content and live regions.** `aria-hidden="true"`, `role="presentation"`, or `role="none"` on a focusable element or an ancestor of one. A live region created in the same update as its message. `role="alert"` used for a routine confirmation, or focus moved into an alert. `role="tooltip"` on a popup that contains a control.
9. **Tools, then a spot check.** Automation finds a subset of these issues. It does not prove the keyboard model or that a state updates. Run the tools the repo already has, and skip the ones it does not. Do not add a dependency only to review.
   - axe-core, in the browser, the CLI, or `@axe-core/playwright`
   - `eslint-plugin-jsx-a11y`
   - Lighthouse, accessibility category
   - Then one manual pass with VoiceOver (macOS or iOS) or NVDA (Windows): Tab to the control, listen for name, role, and state, operate it, and listen again. For a dialog, confirm focus does not land on the page behind it.

Common failures and the code to replace them are in [references/anti-patterns.md](references/anti-patterns.md). A finished report is in [examples/sample-review.md](examples/sample-review.md).

## Output

```markdown
# ARIA review: {scope}

## Scope

- What was reviewed (files, diff, or URL) and what was not.
- Tools that ran, and tools that were not available.

## Findings

| Severity | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| Blocker / Major / Minor | Criterion, level | file:line or selector | What the user hits | What to change, with a short code suggestion |

## Summary

One paragraph: how many findings of each severity, and the pattern that caused most of them.

## Verdict

| Component | Verdict | Why |
|---|---|---|
| {name} | Pass / Fail | Highest severity, or "no Blocker or Major" |

**Review:** Pass / Fail
```

If there are no findings, keep the table with a single row that says so, and pass the component. Quote a file and line when you have source. Quote a selector when you only have the rendered page. Do not invent a line number.

## When to read each file

| Read it when | File |
|---|---|
| You need the expected role, states, or keys for a pattern | [references/expected-behavior.md](references/expected-behavior.md) |
| You are writing the fix column | [references/anti-patterns.md](references/anti-patterns.md) |
| You want the shape of a finished report | [examples/sample-review.md](examples/sample-review.md) |

## Sources

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/), [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) ("No ARIA is better than Bad ARIA"), [names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/), [keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- [Using ARIA](https://www.w3.org/TR/using-aria/) — four rules, including no `presentation` or `aria-hidden` on a focusable element. Discontinued draft.
- [Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [WCAG 2.2 Understanding](https://www.w3.org/WAI/WCAG22/Understanding/): [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) (A), [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) (A), [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) (AA), [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) (AA), [2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) (AAA), [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (AA), [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) (AA), [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) (AA), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) (A), [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) (AA)
