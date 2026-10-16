# APG patterns

Read this before choosing a role or writing keyboard behavior. One component, one pattern. Pattern pages live under <https://www.w3.org/WAI/ARIA/apg/patterns/>.

`aria-expanded`, `aria-selected`, `aria-checked`, and `aria-pressed` answer different questions. Use the one the pattern names.

## Button and link

| | |
|---|---|
| Native | `<button type="button">` for an action. `<a href>` for navigation. |
| Role | Implicit. Add `role="button"` only when a native button is impossible, and then add Enter, Space, and `tabindex="0"`. |
| Name | Inner text. Icon-only: `aria-label` or `aria-labelledby` with the visible tooltip text if that text is the label. |
| Toggle | `aria-pressed` `true`/`false`. The visible label stays the same ("Mute" stays "Mute"). If the label changes ("Mute" / "Unmute"), do not set `aria-pressed`. |
| Menu button | `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` the menu. |
| Keyboard | Enter and Space activate. Focus stays on the button unless the action opens a dialog or moves to a new step. |
| Disabled | `disabled` when the button should leave the tab order. `aria-disabled="true"` when it must stay focusable; the script ignores Enter, Space, and click. |
| Do not | Use a link for an action, a button for navigation, or Space to activate a link. Space on a native link scrolls the page. |

[Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). [Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/).

## Disclosure and accordion

| | |
|---|---|
| Native | `<details>` and `<summary>` when the panel sits with the control. Do not add `role="button"` to `summary`. |
| Custom | `<button aria-expanded="true\|false" aria-controls="{panel-id}">`. `aria-controls` is optional on a single disclosure and required on an accordion header. |
| Keyboard | Enter and Space toggle. Tab moves through the button and then through the visible panel. Arrow keys are not part of the accordion pattern. |
| Panel | Hide with the `hidden` attribute or `display: none`, so the panel leaves the accessibility tree and the tab order. |
| Accordion | Each header button is the only element inside a heading (`h2`–`h6`, or `role="heading"` plus `aria-level`). If a panel is not allowed to collapse, `aria-disabled="true"` on its header. A panel may be a `region` named by the button. Avoid more than about six regions that can be open together. |

[Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/).

## Dialog, tooltip, and popover

| | |
|---|---|
| Modal, native | `<dialog>` opened with `showModal()`. Implicit role `dialog`. Name it. The method supplies the inert background, the Tab cycle, and Escape. Check initial focus and that focus returns to the invoker. |
| Modal, custom | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` the visible title. Focus moves inside on open, Tab cycles, Escape closes, focus returns. Include a visible close button. Set `aria-modal="true"` only when outside content is inert for everyone and visually obscured. |
| Initial focus | First focusable element. If the content is long or has headings, lists, or paragraphs, focus a `tabindex="-1"` element at the start instead. For a destructive confirm, focus the least destructive action. Use `alertdialog` when the user must stop for a short important message. |
| Tooltip | `role="tooltip"` on the popup. The trigger points at it with `aria-describedby`. No focusable content. Focus stays on the trigger. Escape dismisses. Show it on keyboard focus as well as hover. [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html): dismissible, hoverable, and persistent while hovered or focused. The [tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) is still marked work in progress. |
| Popover | If the popup contains a control, it is not a tooltip. Use the HTML `popover` attribute or a non-modal dialog (`role="dialog"` without `aria-modal`). Name it. Escape closes. `aria-haspopup` has no `tooltip` value. |

[Dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Do not put `aria-hidden` on a background wrapper that also contains the dialog.

## Tabs

HTML has no tab element. A `button` with `role="tab"` is the usual control. The role is a deliberate replacement of the button announcement.

| | |
|---|---|
| Roles | `tablist` contains `tab` elements. Each panel is a `tabpanel`. |
| States | Selected tab: `aria-selected="true"` and `tabindex="0"`. Other tabs: `aria-selected="false"` and `tabindex="-1"`. |
| Properties | Each tab `aria-controls` its panel. Each panel `aria-labelledby` its tab. Name the tablist with `aria-labelledby` or `aria-label`. Vertical lists set `aria-orientation="vertical"` (default is horizontal). |
| Keyboard | Left and Right move across a horizontal list and wrap. Up and Down move across a vertical list. A horizontal list does not take Up or Down; those keys scroll. Automatic activation (preferred when the panel appears immediately): selection follows focus. Manual: Enter or Space selects. Home and End are optional. |
| Focus | Tab enters the selected tab. Tab from the tablist moves to the panel, or to the next page control if the panel has nothing focusable. If the panel has no focusable content, set `tabindex="0"` on the panel. |
| Do not | Use tabs for links that go to other URLs. That is navigation with `aria-current`. |

Arrow keys must move DOM focus to the newly selected tab. Updating state without calling `focus()` leaves the user on the previous tab.

[Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

## Menu and navigation

| | |
|---|---|
| Site or product nav | `<nav aria-label="…">` and a list of links. Submenus are disclosure buttons plus links. |
| Application menu | `role="menu"` or `menubar` for commands, like a desktop menu. Items are `menuitem`, `menuitemcheckbox`, or `menuitemradio`. |
| Menu keyboard | One tab stop. Arrows move. Enter activates and closes. Escape closes and returns focus to the button or parent item. Parent item: `aria-haspopup="menu"` and `aria-expanded`. Checked items use `aria-checked`. Disabled items stay focusable with `aria-disabled="true"` and do not activate. |
| Focus model | Roving `tabindex`, or `aria-activedescendant` on the menu. |
| Do not | Put `role="menu"` on a list of links. Items leave the Tab order, and the role promises menu keys. |

[Menu and menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menu/). Disclosure navigation examples on the [disclosure pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) are the site-nav model.

## Listbox

| | |
|---|---|
| Native | `<select>` when the design allows it, including `size` greater than 1. |
| Roles | `listbox` owns `option` elements. Groups use `role="group"` with a name. |
| Name | Visible label via `aria-labelledby`, unless the listbox is the popup of a combobox. |
| Selection | `aria-selected` `true`/`false`. Set `aria-multiselectable="true"` only for multi-select. Do not also set `aria-checked` on those options. |
| Keyboard | One tab stop. Up and Down move. Home and End are strongly recommended past five options. Type-ahead is recommended. Single-select may follow focus; do not use that when the update is slow or surprising. |
| Focus model | Roving `tabindex` or `aria-activedescendant`. |
| Do not | Put links, buttons, or other controls inside an option. Use a grid for interactive rows. Do not use a listbox as navigation. |

[Listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).

## Combobox

ARIA 1.2 puts `role="combobox"` on the focusable input. A non-focusable wrapper with an inner textbox is the ARIA 1.1 shape and does not conform to 1.2.

| | |
|---|---|
| Native | `<select>`, or `<input>` with `<datalist>`, when the design allows it. |
| Required | `aria-expanded` and `aria-controls` pointing at the popup. |
| Popup | `listbox`, `grid`, `tree`, or `dialog`. `aria-haspopup` defaults to `listbox`. Set it to `dialog`, `grid`, or `tree` when the popup is not a listbox. |
| Autocomplete | `aria-autocomplete` is `none`, `inline`, `list`, or `both`, matching what the field does. |
| Active option | `aria-activedescendant` points at the option id. DOM focus stays on the input. |
| Name | A label, separate from the typed value. |
| Keyboard | The input is the only tab stop. The popup is not in the page tab order. Down Arrow moves into the popup. Enter accepts the active suggestion. Escape closes the popup and returns to the input. Clearing the field on Escape is optional. |
| Focus model | Either move DOM focus into a listbox, grid, or tree popup, or keep DOM focus on the input and set `aria-activedescendant`. A dialog popup takes DOM focus. Dialogs do not use `aria-activedescendant`. |
| Do not | Use the ARIA 1.1 non-focusable wrapper. Do not use a menu button when the control needs a value and a required state. |

[Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). [ARIA 1.2 combobox](https://www.w3.org/TR/wai-aria-1.2/#combobox).

## Switch, checkbox, and radio

| | Switch | Checkbox | Radio |
|---|---|---|---|
| Native | `<input type="checkbox" role="switch">` | `<input type="checkbox">` | `<input type="radio">` sharing `name` |
| Group | `fieldset`/`legend` or `role="group"` | `fieldset`/`legend` or `role="group"` | `fieldset`/`legend` or `role="radiogroup"` |
| State | `checked` on a native checkbox. Otherwise `aria-checked` `true`/`false` | `checked`. Mixed parent: `aria-checked="mixed"` or the `indeterminate` IDL | `checked`. Custom: `aria-checked` |
| Keys | Space toggles. Enter is optional | Space toggles. Each box is in the tab order | Tab enters once, on the checked radio. Arrows move and select. Space checks the focused radio if it is not checked |
| Label | Does not change when the state changes | Visible label | Visible label |
| Do not | Use `aria-pressed`. A switch has no mixed state | Use arrow-key roving tabindex | Use `aria-pressed`. Inside a toolbar, arrows move without changing the checked radio; Space checks it |

Choose by meaning. On/off is a switch ("Lights, switch, on"). A member of a checklist is a checkbox. A button whose label stays put while it toggles is `aria-pressed`, not a switch.

A custom radio uses `role="radio"` inside `role="radiogroup"`, `aria-checked`, and either a roving `tabindex` or `aria-activedescendant`. On a native checkbox with `role="switch"`, update the `checked` attribute and do not add `aria-checked`.

[Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). [Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/). [Radio group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

## Alert and status

| | Alert | Status |
|---|---|---|
| Role | `alert` | `status` |
| Implicit live | `assertive`, `aria-atomic="true"` | `polite`, `aria-atomic="true"` |
| Focus | Does not move | Does not move |
| Use | Important, time-sensitive text | Advisory text ("Saved", "3 results") |
| Instead | `alertdialog` when the user must respond | `alert` only when the message is urgent |

Mount the region in the initial DOM, then change its text. Do not create the region and its message in one update. Do not override `role="alert"` with `aria-live="polite"`.

Form errors: `aria-invalid="true"` on the field, and `aria-describedby` or `aria-errormessage` pointing at visible error text. `aria-errormessage` is exposed only when `aria-invalid` is not `false`. The error node is not hidden while it is pertinent.

[Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/). [`status` role](https://www.w3.org/TR/wai-aria-1.2/#status). [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) (AA).

## Breadcrumb

`<nav aria-label="Breadcrumb">` (translate the name with the UI) around an ordered list of links. The current page, when it is a link, has `aria-current="page"`. When the current page is not a link, `aria-current` is optional. Keyboard is the native link. No widget keys.

[Breadcrumb pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/).

## Carousel

| | |
|---|---|
| Container | `region` or `group`, with `aria-roledescription="carousel"` and a name that does not repeat the word "carousel". |
| Slide | `role="group"`, `aria-roledescription="slide"`, and a name. "3 of 10" is acceptable when the slide has no unique visible name. |
| Controls | Previous, next, and rotation are buttons. Activating them does not move focus. |
| Auto-rotate | A pause button is the first tab stop inside the carousel. Rotation stops on keyboard focus and on hover, and stays stopped until the user starts it. The button label changes between "Stop slide rotation" and "Start slide rotation". Do not use `aria-pressed` for that. `aria-live` is `off` while it auto-rotates and `polite` when it does not. |
| Pickers | Tabs follow the tabs pattern. Button pickers: the current button uses `aria-disabled="true"` so it stays in the tab order. |
| Hidden slides | Remove them from the accessibility tree. Off-screen positioning alone is not enough. |

[Carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) (A).
