# Expected behavior

Compare the component with the row that matches its job. One wrong row is a finding even when the attributes are spelled correctly. Pattern pages: <https://www.w3.org/WAI/ARIA/apg/patterns/>.

| Pattern | What you should find | Keys and focus |
|---|---|---|
| Button | `<button>`, or a focusable element with `role="button"` and a written reason | Enter and Space activate. Focus stays put unless the action opens a dialog or changes step |
| Link | `<a href>` when it navigates | Enter activates. Space scrolls; it does not activate |
| Toggle button | `aria-pressed` `true`/`false`. Label text does not change | Same as button |
| Disclosure | `<details>`/`<summary>`, or a button with `aria-expanded` | Enter and Space toggle. Collapsed panel is gone from the tab order |
| Accordion | Disclosure headers, each the only content of a heading. `aria-controls` the panel | Enter and Space. Tab between headers. No arrow-key model |
| Modal dialog | `<dialog>` via `showModal()`, or `role="dialog"` plus `aria-modal="true"`. Named by the visible title | Focus moves in, Tab cycles, Escape closes, focus returns. Visible close button |
| Tooltip | `role="tooltip"`, trigger `aria-describedby`, no controls inside | Escape dismisses. Focus stays on the trigger. Shown on focus, not only hover |
| Popover | Interactive popup is a non-modal dialog or an HTML `popover`, named | Escape closes. Not `role="tooltip"` |
| Tabs | `tablist`, `tab`, `tabpanel`. One tab has `tabindex="0"`. Selected tab `aria-selected="true"`. Panel `aria-labelledby` the tab | Left and Right move focus in a horizontal list. Up and Down do that only when `aria-orientation="vertical"`. Automatic: selection follows focus. Tab from the tablist enters the panel |
| Navigation | `<nav>` and links. Submenus are disclosures | Links stay in the tab order. Not `role="menu"` |
| Menu | `menu` / `menubar` of `menuitem` for commands | One tab stop. Arrows move. Escape returns focus. Disabled items are focusable and do not activate |
| Listbox | `<select>`, or `listbox`/`option` with `aria-selected` | One tab stop. Up and Down move. Options contain no other controls |
| Combobox | `role="combobox"` on the input. `aria-expanded` and `aria-controls`. Popup is listbox, grid, tree, or dialog | The input is the only tab stop. Down Arrow moves into the popup by DOM focus or `aria-activedescendant`. Escape closes it. A dialog popup takes DOM focus |
| Switch | `input type="checkbox"` with `role="switch"` and the `checked` attribute, or another element with `role="switch"` and `aria-checked`. Label does not change | Space toggles |
| Checkbox | Native checkbox and label. Grouped with `fieldset`/`legend` | Space toggles. Each checkbox is a tab stop |
| Radio | Native radios sharing `name`, in a fieldset | Tab enters once. Arrows move and select |
| Alert | `role="alert"`, already in the DOM, focus does not move | No keyboard of its own |
| Status | `role="status"`, already in the DOM, focus does not move | No keyboard of its own |
| Breadcrumb | `nav` with an accessible name, ordered list of links, current link `aria-current="page"` | Native links |
| Carousel | Container `aria-roledescription="carousel"`. Previous and next are buttons. Pause control when it auto-rotates | Activating next, previous, or pause does not move focus. Auto-rotate stops on focus and hover |

Attribute values that are always wrong:

- `aria-expanded="expanded"`, `aria-selected="selected"`, or any value other than `true` or `false` for those two states.
- `aria-checked` or `aria-pressed` of `mixed` on a switch. Switches are on or off.
- `aria-haspopup="tooltip"` or `aria-haspopup="true"` when the popup is a dialog. `true` means menu.
- `aria-invalid="false"` together with a visible `aria-errormessage`. The message is not exposed.
- `role="button"` on `<button>`, `role="navigation"` on `<nav>`, or another copy of an implicit role.
