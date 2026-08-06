import { describe, it, expect, afterEach } from 'vitest';
import './button';
import { mount, update, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

describe('cc-button', () => {
  it('registers the custom element', () => {
    expect(customElements.get('cc-button')).toBeDefined();
  });

  it('renders a native button with the default variant and size', async () => {
    const el = await mount('cc-button');
    const button = el.querySelector('button');

    expect(button).not.toBeNull();
    expect(button!.className).toBe('button button--primary button--medium');
    expect(button!.type).toBe('button');
  });

  it('reflects variant and size into the class list', async () => {
    const el = await mount('cc-button', { variant: 'destructive', size: 'icon' });
    expect(el.querySelector('button')!.className).toBe('button button--destructive button--icon');
  });

  it('applies the disabled attribute', async () => {
    const el = await mount('cc-button', { disabled: true });
    expect(el.querySelector('button')!.disabled).toBe(true);
  });

  it('omits aria-label when none is given', async () => {
    const el = await mount('cc-button');
    expect(el.querySelector('button')!.hasAttribute('aria-label')).toBe(false);
  });

  it('sets aria-label when given', async () => {
    const el = await mount('cc-button', { ariaLabel: 'Close dialog' });
    expect(el.querySelector('button')!.getAttribute('aria-label')).toBe('Close dialog');
  });

  it('emits a composed, bubbling "clicked" event', async () => {
    const el = await mount('cc-button');
    let received: CustomEvent | null = null;
    document.body.addEventListener('clicked', (e) => (received = e as CustomEvent));

    el.querySelector('button')!.click();

    expect(received).not.toBeNull();
    expect(received!.bubbles).toBe(true);
    expect(received!.composed).toBe(true);
  });

  it('does not emit "clicked" while disabled', async () => {
    const el = await mount('cc-button', { disabled: true });
    let count = 0;
    document.body.addEventListener('clicked', () => count++);

    el.querySelector('button')!.click();

    expect(count).toBe(0);
  });

  // Documents the light-DOM slot bug (#151). The component renders a <slot>
  // while createRenderRoot() returns `this`, so authored content is never
  // projected into the <button> — it lands beside it instead, leaving the
  // control empty and unnamed. The fix is to replace this element with the
  // upstream shadow-DOM `candor-button` (#149, stage 3), at which point this
  // file goes away rather than the test being unskipped — see
  // candor-package.spec.ts for the equivalent assertion against candor-card.
  it.skip('projects authored content into the button', async () => {
    document.body.innerHTML = '<cc-button>Save changes</cc-button>';
    const el = document.querySelector('cc-button')!;
    await flush(el);

    expect(el.querySelector('button')!.textContent!.trim()).toBe('Save changes');
  });

  it('stops emitting once disabled is set after mount', async () => {
    const el = await mount('cc-button');
    let count = 0;
    document.body.addEventListener('clicked', () => count++);

    el.querySelector('button')!.click();
    expect(count).toBe(1);

    await update(el, { disabled: true });
    el.querySelector('button')!.click();
    expect(count).toBe(1);
  });
});
