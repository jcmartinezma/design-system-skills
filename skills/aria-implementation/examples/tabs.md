# Tabs

Shape for the accessibility spec. HTML has no tab element, so the tabs pattern is the reason ARIA is used. Activation is automatic: the panel is already in the DOM and appears immediately.

## Accessibility spec: Tabs

- **Pattern:** [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), automatic activation
- **Element / role:** `tablist` of `button` elements with `role="tab"`, plus `tabpanel` elements. No native element exposes a tab.
- **Name:** Each tab's name is its visible text ("Details", "Shipping"). The tablist is named with `aria-label="Product information"`. Each panel is named by `aria-labelledby` pointing at its tab.
- **States:** The selected tab has `aria-selected="true"` and `tabindex="0"`. The others have `aria-selected="false"` and `tabindex="-1"`.
- **Properties:** Each tab `aria-controls` its panel. Each panel `aria-labelledby` its tab.
- **Keyboard:**

  | Key | When focus is | Result |
  |---|---|---|
  | Tab | Anywhere outside | Moves to the selected tab |
  | Right Arrow | On a tab | Moves focus to the next tab, wraps, and selects it |
  | Left Arrow | On a tab | Moves focus to the previous tab, wraps, and selects it |
  | Tab | On the selected tab | Moves to the open panel |
  | Home / End | On a tab | Not implemented. Optional in the pattern |

- **Focus:** Arrow keys call `focus()` on the newly selected tab. The closed panel is `hidden`. The open panel has `tabindex="0"` because its sample content has no focusable control.
- **Announcements:** None. The selected state and the panel name are enough. Do not announce the panel with `role="alert"`.

## Implementation

```jsx
import { useId, useState } from "react";

const TABS = [
  { label: "Details", panel: "Woven cotton. Machine wash cold." },
  { label: "Shipping", panel: "Ships in two business days." },
];

export function Tabs() {
  const [selected, setSelected] = useState(0);
  const baseId = useId();

  function onKeyDown(event) {
    const tabs = [...event.currentTarget.querySelectorAll('[role="tab"]')];
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;

    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else return;

    event.preventDefault();
    setSelected(next);
    tabs[next].focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Product information" onKeyDown={onKeyDown}>
        {TABS.map((tab, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={tab.label}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {TABS.map((tab, index) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== selected}
          tabIndex={0}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
```

A click selects a tab without moving focus, because the click already put focus on that tab. Only the arrow keys need `focus()`. A horizontal tablist does not listen for Up or Down.

## Self-check

- [x] No native tab element exists. The reason is in the spec.
- [x] Roles are tablist, tab, and tabpanel. Arrows move and select. Enter and Space are not required because activation is automatic.
- [x] Each accessible name is the visible tab label.
- [x] `aria-selected` and `tabindex` both follow `selected`. `aria-pressed` is absent.
- [x] Tab and panel ids share `useId`.
- [x] The buttons use `:focus-visible`. Add the system's focus token in the component CSS.
- [x] Dialog focus is not applicable.
- [x] Closed panels use `hidden`, not `aria-hidden` on a focusable tab.
- [x] No live region.
- [x] `role="tab"` does not create the arrow keys. The `onKeyDown` handler does.
