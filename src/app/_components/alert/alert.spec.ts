import { describe, it, expect, afterEach, vi } from 'vitest';
import '@candor-design/web-components';
import './alert';
import { mount, update, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

/** The polite region `candor-toast-container` keeps in its shadow root. */
const politeRegion = (el: Element) =>
  el.querySelector('candor-toast-container')!.shadowRoot!.querySelector(
    '[aria-live="polite"]',
  ) as HTMLElement;

/** Lines the container has written into its region, oldest first. */
async function announcements(el: Element) {
  await flush(el);
  const toast = el.querySelector('candor-toast') as (HTMLElement & { updateComplete?: Promise<unknown> }) | null;
  await toast?.updateComplete;
  // The container writes each line after the toast's own update settles.
  await new Promise((resolve) => setTimeout(resolve, 0));
  return Array.from(politeRegion(el).children).map((line) => line.textContent!.trim());
}

describe('cc-alert announcements', () => {
  it('keeps the container, and so its live region, in the DOM before any message', async () => {
    const el = await mount('cc-alert');

    // Assistive tech has to be observing the region *before* its contents
    // change; a region created alongside its text announces nothing.
    const live = politeRegion(el);
    expect(live).toBeTruthy();
    expect(live.textContent!.trim()).toBe('');
  });

  it('announces a message through the container', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: '639066 copied to clipboard.' } });

    expect(await announcements(el)).toEqual(['639066 copied to clipboard.']);
  });

  it('re-announces the same message twice in a row', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: 'ffffff copied to clipboard.' } });
    const first = el.querySelector('candor-toast');
    expect(await announcements(el)).toEqual(['ffffff copied to clipboard.']);

    // Copying the same colour again must not be silent. The container announces
    // on insertion, so the toast is keyed to render a fresh element.
    await update(el, { alertMessage: { message: 'ffffff copied to clipboard.' } });
    expect(el.querySelector('candor-toast')).not.toBe(first);
    expect(await announcements(el)).toEqual(['ffffff copied to clipboard.']);
  });

  it('leaves the toast exposed — the container, not the app, handles announcing', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: 'Swapped foreground and background colors.' } });

    const toast = el.querySelector('candor-toast')!;
    expect(toast.hasAttribute('aria-hidden')).toBe(false);
    expect(toast.getAttribute('message')).toBe('Swapped foreground and background colors.');
    // Inside the container the toast drops its own live role, so nothing is
    // queued twice.
    expect(toast.shadowRoot!.querySelector('[role="status"], [role="alert"]')).toBeNull();
  });

  it('still shows the toast visually', async () => {
    const el = await mount('cc-alert');
    expect(el.querySelector('candor-toast')).toBeNull();

    await update(el, { alertMessage: { message: 'Chroma matched foreground and background colors.' } });
    expect(el.querySelector('candor-toast')).toBeTruthy();
  });

  it('keeps the toast container mounted whether or not a toast is showing', async () => {
    const el = await mount('cc-alert');
    const container = el.querySelector('candor-toast-container')!;

    expect(container).toBeTruthy();
    expect(container.getAttribute('position')).toBe('bottom-right');

    await update(el, { alertMessage: { message: 'Swapped foreground and background colors.' } });
    expect(el.querySelector('candor-toast')!.parentElement).toBe(container);
    expect(el.querySelector('candor-toast-container')).toBe(container);
  });

  it('drops its timer when torn down while a toast is showing', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: 'Resetted color sliders to initial states.' } });

    const clear = vi.spyOn(globalThis, 'clearTimeout');
    el.remove();

    expect(clear).toHaveBeenCalled();
    clear.mockRestore();
  });
});
