/**
 * Helpers for exercising the Lit elements in vitest.
 *
 * Every component in this app overrides `createRenderRoot()` to return `this`,
 * so rendered markup lands in the light DOM and is queryable directly off the
 * element — no shadow root traversal.
 */

/**
 * Mounts an element, sets properties, and waits for the first render.
 *
 * Properties are assigned rather than set as attributes so that non-string
 * types (booleans, objects) reach the component as-is.
 */
export async function mount<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> = {},
): Promise<HTMLElementTagNameMap[K]> {
  const el = document.createElement(tag);
  Object.assign(el, props);
  document.body.appendChild(el);
  await flush(el);
  return el;
}

/** Waits for a Lit element to finish its pending render. */
export async function flush(el: Element): Promise<void> {
  const updateComplete = (el as { updateComplete?: Promise<unknown> }).updateComplete;
  if (updateComplete) await updateComplete;
}

/** Sets properties on a mounted element and waits for the re-render. */
export async function update<T extends Element>(el: T, props: Partial<T>): Promise<T> {
  Object.assign(el, props);
  await flush(el);
  return el;
}

/** Removes everything mounted during a test. */
export function cleanup(): void {
  document.body.innerHTML = '';
}
