# Sample review

Fictional pull request. Use the shape, not the file paths, for a real review.

---

# ARIA review: Product page components

## Scope

- Diff of `src/ShippingDisclosure.tsx`, `src/ProductTabs.tsx`, and `src/PayButton.tsx`. No rendered page.
- ESLint with `eslint-plugin-jsx-a11y` ran and reported the clickable `div`. axe-core and Lighthouse were not run. No browser was open.
- VoiceOver and NVDA were not run. Keyboard behavior below is from reading the handlers, not from a screen reader pass.

## Findings

| Severity | WCAG | Location | Problem | Fix |
|---|---|---|---|---|
| Blocker | 2.1.1 Keyboard (A) | `src/ShippingDisclosure.tsx:14` | The header is a `div` with `onClick`. It has no role, it is not in the tab order, and Enter and Space do nothing. | Replace it with `<button type="button" aria-expanded={open} aria-controls={panelId}>`. Hide the panel with the `hidden` attribute. |
| Major | 4.1.2 Name, Role, Value (A) | `src/ProductTabs.tsx:28` | Both tabs stay `aria-selected="true"`. Arrow keys are not handled, and both buttons are in the tab order. | Keep `tabindex="0"` and `aria-selected={true}` on the selected tab only. On ArrowRight and ArrowLeft, update the index and call `focus()` on the next tab. |
| Major | 2.5.3 Label in Name (AA) | `src/PayButton.tsx:9` | The button shows "Pay now" and has `aria-label="Submit order"`. The label wins the name computation and replaces the visible text. | Delete `aria-label`. The button text is the name. |
| Minor | 4.1.2 Name, Role, Value (A) | `src/PayButton.tsx:8` | `role="button"` on a `<button>` repeats the implicit role. | Delete the `role`. |

## Summary

Four findings: one Blocker, two Major, one Minor. The Blocker is a disclosure built from a non-interactive element. The tabs fail the tabs keyboard model rather than a missing attribute spelling. The pay button's accessible name does not match its visible label.

## Verdict

| Component | Verdict | Why |
|---|---|---|
| Shipping disclosure | Fail | Blocker. Not keyboard operable. |
| Product tabs | Fail | Major. Selection state and arrow keys do not match the tabs pattern. |
| Pay button | Fail | Major. Visible label is not the accessible name. Removing the redundant role alone would leave it a Fail. |

**Review:** Fail
