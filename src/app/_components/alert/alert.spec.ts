import { describe, it, expect, afterEach, vi } from 'vitest';
import './alert';
import { mount, update, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

const liveRegion = (el: Element) => el.querySelector('[role="status"]') as HTMLElement;

/** The announcement is deliberately deferred — see `_announce()`. */
async function announced(el: Element) {
  await new Promise((resolve) => setTimeout(resolve, 150));
  await flush(el);
  return liveRegion(el).textContent!.trim();
}

describe('cc-alert live region', () => {
  it('keeps the region in the DOM before any message arrives', async () => {
    const el = await mount('cc-alert');

    // The whole point: assistive tech has to be observing the region *before*
    // its contents change. A region created alongside its text announces
    // nothing, which is what the toast on its own was doing.
    const live = liveRegion(el);
    expect(live).toBeTruthy();
    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.textContent!.trim()).toBe('');
  });

  it('announces a message', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: '639066 copied to clipboard.' } });

    expect(await announced(el)).toBe('639066 copied to clipboard.');
  });

  it('re-announces the same message twice in a row', async () => {
    const el = await mount('cc-alert');

    await update(el, { alertMessage: { message: 'ffffff copied to clipboard.' } });
    expect(await announced(el)).toBe('ffffff copied to clipboard.');

    // Copying the same colour again must not be silent. A live region only
    // fires on a change, so the text is cleared before it is re-set.
    await update(el, { alertMessage: { message: 'ffffff copied to clipboard.' } });
    expect(liveRegion(el).textContent!.trim()).toBe('');
    expect(await announced(el)).toBe('ffffff copied to clipboard.');
  });

  it('hides the toast from assistive tech so nothing is queued twice', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: 'Swapped foreground and background colors.' } });

    const toast = el.querySelector('candor-toast')!;
    // candor-toast carries its own role="status" in shadow DOM; aria-hidden on
    // the host covers that too.
    expect(toast.getAttribute('aria-hidden')).toBe('true');
    expect(toast.getAttribute('message')).toBe('Swapped foreground and background colors.');
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

    // Candor's documented outlet, and it is the toast's parent — the app no
    // longer positions the stack itself.
    expect(container).toBeTruthy();
    expect(container.getAttribute('position')).toBe('bottom-right');

    await update(el, { alertMessage: { message: 'Swapped foreground and background colors.' } });
    expect(el.querySelector('candor-toast')!.parentElement).toBe(container);
    expect(el.querySelector('candor-toast-container')).toBe(container);
  });

  it('drops its timers when torn down mid-announcement', async () => {
    const el = await mount('cc-alert');
    await update(el, { alertMessage: { message: 'Resetted color sliders to initial states.' } });

    const clear = vi.spyOn(globalThis, 'clearTimeout');
    el.remove();

    expect(clear).toHaveBeenCalled();
    clear.mockRestore();
  });
});
