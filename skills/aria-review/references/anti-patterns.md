# Anti-patterns

Each pair is a finding and a fix. The fix is the code suggestion for the review table. Keep the suggestion as short as the one in the component's language.

## Clickable div

`div` with `onClick` is not in the tab order and has no role. Blocker, [2.1.1](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html).

```html
<div class="header" onclick="toggle()">Shipping details</div>
```

```html
<button type="button" aria-expanded="false" aria-controls="shipping-panel">
  Shipping details
</button>
```

Adding `role="button"` without Enter, Space, and `tabindex="0"` still fails. Prefer the native button so the keys and the focus are built in.

## Redundant role

```html
<button role="button">Save</button>
<nav role="navigation">…</nav>
```

```html
<button type="button">Save</button>
<nav>…</nav>
```

Minor, [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). Repeating the implicit role is noise. It becomes Major when the extra role disagrees with the element, as in the next pair.

## Role that erases the native one

```html
<ul role="navigation">
  <li><a href="/shop">Shop</a></li>
</ul>
```

```html
<nav aria-label="Shop">
  <ul>
    <li><a href="/shop">Shop</a></li>
  </ul>
</nav>
```

Major. `role="navigation"` on the `ul` removes the list. The same rule covers `role="menu"` on a site nav: the links leave the tab order and the widget promises menu arrow keys. Use disclosure buttons for submenus.

## Visible label replaced

```html
<button aria-label="Submit order">Pay now</button>
```

```html
<button type="button">Pay now</button>
```

Major, [2.5.3](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html). `aria-label` wins over the button text, so speech input and the screen reader hear "Submit order" while the screen says "Pay now". Icon-only buttons are the case for `aria-label`, because there is no visible text to keep.

## State that does not change

```jsx
<button type="button" aria-expanded="true" onClick={() => setOpen(!open)}>
  Shipping details
</button>
<div hidden={!open}>{children}</div>
```

```jsx
<button
  type="button"
  aria-expanded={open}
  aria-controls={panelId}
  onClick={() => setOpen(!open)}
>
  Shipping details
</button>
<div id={panelId} hidden={!open}>{children}</div>
```

Major, [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). The visual toggles and the state does not. The same bug is `aria-selected="true"` left on the first tab, and `aria-pressed` left off a toggle whose label never changes.

## Wrong state attribute

```html
<button type="button" aria-pressed="false" aria-controls="filters">Filters</button>
```

```html
<button type="button" aria-expanded="false" aria-controls="filters">Filters</button>
```

Major. A disclosure is expanded or collapsed. A toggle button whose label stays the same is pressed or not. A switch is checked or not. A tab is selected or not.

## Disabled that still activates, or disabled that cannot be explained

```html
<button type="button" aria-disabled="true" onclick="save()">Save</button>
```

```html
<button type="button" disabled>Save</button>
```

Use `disabled` when the action is unavailable and the button should be skipped. Use `aria-disabled="true"` only when focus must stay so a description can be read, and ignore click, Enter, and Space in the handler:

```html
<button
  type="button"
  aria-disabled="true"
  aria-describedby="save-reason"
  onclick="if (this.getAttribute('aria-disabled') === 'true') return; save();"
>
  Save
</button>
<p id="save-reason">Add a shipping address first.</p>
```

`aria-disabled` without that guard is Major: assistive technologies announce disabled, and the action still runs.

## Dialog focus

```jsx
<div role="dialog" aria-modal="true">
  <h2>Delete project</h2>
  <button type="button" onClick={onClose}>Cancel</button>
</div>
```

Major or Blocker, [2.4.3](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html). Missing pieces: name from the heading (`aria-labelledby`), focus moved inside on open, Tab cycle, Escape, and focus returned to the button that opened it. `aria-modal="true"` while the page behind is still reachable is a Blocker.

```html
<dialog aria-labelledby="delete-title">
  <h2 id="delete-title">Delete project</h2>
  <button type="button" value="cancel">Cancel</button>
  <button type="button" value="default">Delete</button>
</dialog>
```

Open with `showModal()`. The heading id is the name. Confirm focus returns to the invoker on close.

## aria-hidden on something focusable

```html
<div aria-hidden="true">
  <button type="button">Save</button>
</div>
```

```html
<button type="button">Save</button>
```

Blocker when the button can still be focused: the user lands on an empty object. `role="presentation"` on a focusable element is the same class of bug. Hiding a closed menu is fine when the menu is also removed from the tab order (`hidden`, or `display: none`).

## Tooltip that contains a control

```html
<button type="button" aria-describedby="tip">Share</button>
<div id="tip" role="tooltip">
  <a href="/share">Copy link</a>
</div>
```

```html
<button type="button" aria-expanded="false" aria-controls="share-menu">Share</button>
<div id="share-menu" popover>
  <a href="/share">Copy link</a>
</div>
```

Major, [1.4.13](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) when the popup is hover-only, and [4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) for the tooltip role. A tooltip does not hold focus. Interactive content is a disclosure or a non-modal dialog. Name it, and close it on Escape.

## Live region created too late

```jsx
{error ? <div role="alert">{error}</div> : null}
```

```jsx
<div role="alert">{error}</div>
```

Major, [4.1.3](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), when the message does not get announced. Mount `role="alert"` or `role="status"` before the text changes. Use `status` for "Saved". Use `alert` for a time-sensitive failure. Do not move focus into either one. An empty alert is silent; setting its text child is the update.

## Tabs that are all tab stops

```html
<div role="tablist">
  <button type="button" role="tab">Details</button>
  <button type="button" role="tab">Shipping</button>
</div>
```

```html
<div role="tablist" aria-label="Product information">
  <button type="button" role="tab" aria-selected="true" tabindex="0">Details</button>
  <button type="button" role="tab" aria-selected="false" tabindex="-1">Shipping</button>
</div>
```

Major. Arrow keys move the roving tabindex and `aria-selected`. Only the selected tab is in the page tab order. Moving the state without calling `focus()` on the next tab fails the keyboard test even when the attributes look right.
