# Disclosure

Shape for the accessibility spec. The component is a custom disclosure because the header is a design-system button, not a native `summary`. Use `<details>` and `<summary>` when that visual constraint is absent.

## Accessibility spec: Disclosure

- **Pattern:** [Disclosure (Show/Hide)](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- **Element / role:** `<button type="button">`. The button role is implicit. A native `<details>` does not fit when the header has to use the button component's tokens and variants.
- **Name:** The button's text, "Shipping details". No `aria-label`. The name and the visible label are the same string.
- **States:** Collapsed → `aria-expanded="false"`. Expanded → `aria-expanded="true"`.
- **Properties:** `aria-controls="shipping-panel"`. The panel id exists on the panel.
- **Keyboard:**

  | Key | When focus is | Result |
  |---|---|---|
  | Enter | On the button | Toggles the panel and `aria-expanded` |
  | Space | On the button | Toggles the panel and `aria-expanded` |
  | Tab | On the button, panel open | Moves into the panel's first focusable control |
  | Tab | On the button, panel closed | Skips the panel |

- **Focus:** Focus stays on the button while the panel opens and closes. The panel is `hidden` while closed, so its links are not tabbable.
- **Announcements:** None. `aria-expanded` is the state change. Do not add `role="alert"`.

## Implementation

```html
<button type="button" aria-expanded="false" aria-controls="shipping-panel">
  Shipping details
</button>
<div id="shipping-panel" hidden>
  <a href="/shipping">Delivery times</a>
</div>
```

```jsx
import { useId, useState } from "react";

export function Disclosure({ label, children }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </button>
      <div id={panelId} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
```

The `hidden` attribute removes the panel from the accessibility tree. Toggling a CSS class that only changes opacity leaves the links tabbable while they are invisible.

## Self-check

- [x] Native element, or the reason is in the spec. Button is native. `details` is declined because the header has to be the design-system button.
- [x] Role matches the disclosure pattern. Enter and Space come from the button. There is no arrow-key handler.
- [x] The accessible name is the visible label.
- [x] Open and closed update `aria-expanded` only.
- [x] `aria-controls` and the panel id match. `useId` keeps them unique.
- [x] Focus indicator is the button's `:focus-visible` ring. The button does not move under a sticky bar in this example.
- [x] Dialog focus is not applicable. This component is not a dialog.
- [x] Nothing focusable is `aria-hidden` or presentational.
- [x] No live region.
- [x] The button's click and keyboard behavior come from HTML, not from a role.
