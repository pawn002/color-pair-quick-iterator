/**
 * jsdom implements `attachInternals()` but ships an `ElementInternals` without
 * the form-value methods. Candor's form controls are `formAssociated` and call
 * `setFormValue()` from `updated()`, so mounting one throws before it renders.
 *
 * Browsers implement these, so this only fills the gap in the test environment —
 * it deliberately does not emulate form participation, which nothing in this app
 * relies on: the controls are read through their `change` events, not a
 * surrounding <form>.
 */

// jsdom has no global `CSS` object either. candor-radio uses CSS.escape to
// build the selector that finds its group siblings.
if (typeof globalThis.CSS === 'undefined') {
  (globalThis as { CSS?: unknown }).CSS = {
    escape: (value: string) => String(value).replace(/[^\w-]/g, (ch) => `\\${ch}`),
  };
}

const internals = globalThis.ElementInternals?.prototype as
  | (ElementInternals & Record<string, unknown>)
  | undefined;

if (internals && typeof internals.setFormValue !== 'function') {
  internals.setFormValue = () => {};
  internals.setValidity = () => {};
  internals.checkValidity = () => true;
  internals.reportValidity = () => true;
}

/**
 * jsdom's <dialog> has no `showModal()`/`close()`. candor-modal calls one or the
 * other from `updated()` on every change to `open` — including the first, where
 * `open` is false and it calls `close()` — so mounting one throws before it
 * renders at all.
 *
 * Enough to let the element render and toggle. The top-layer and inertness
 * behaviour is not emulated, and no test here asserts on it — the modal
 * assertions read structure and stylesheets, not layout.
 */
const dialog = globalThis.HTMLDialogElement?.prototype as
  | (HTMLDialogElement & Record<string, unknown>)
  | undefined;

if (dialog && typeof dialog.showModal !== 'function') {
  dialog.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  dialog.show = function show(this: HTMLDialogElement) {
    this.open = true;
  };
  dialog.close = function close(this: HTMLDialogElement) {
    this.open = false;
  };
}
