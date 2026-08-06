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
