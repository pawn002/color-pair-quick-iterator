import { describe, it, expect, afterEach } from 'vitest';
import './checkbox';
import { mount, update, cleanup } from '../../../test-utils';

afterEach(cleanup);

describe('candor-checkbox', () => {
  it('registers the custom element', () => {
    expect(customElements.get('candor-checkbox')).toBeDefined();
  });

  it('renders an input wired to its label', async () => {
    const el = await mount('candor-checkbox', { label: 'Constant chroma' });
    const input = el.querySelector('input')!;
    const label = el.querySelector('label')!;

    expect(input.type).toBe('checkbox');
    expect(label.getAttribute('for')).toBe(input.id);
    expect(el.querySelector('.checkbox-label')!.textContent).toBe('Constant chroma');
  });

  it('prefers an explicit input-id over the generated one', async () => {
    const el = await mount('candor-checkbox', { inputId: 'show-gradient' });
    expect(el.querySelector('input')!.id).toBe('show-gradient');
    expect(el.querySelector('label')!.getAttribute('for')).toBe('show-gradient');
  });

  it('generates a unique id when none is supplied', async () => {
    const a = await mount('candor-checkbox');
    const b = await mount('candor-checkbox');

    const idA = a.querySelector('input')!.id;
    const idB = b.querySelector('input')!.id;

    expect(idA).toBeTruthy();
    expect(idA).not.toBe(idB);
  });

  it('reflects checked and disabled', async () => {
    const el = await mount('candor-checkbox', { checked: true, disabled: true });
    const input = el.querySelector('input')!;

    expect(input.checked).toBe(true);
    expect(input.disabled).toBe(true);
    expect(el.querySelector('label')!.className).toContain('checkbox-wrapper--disabled');
  });

  it('emits "changed" with the new state and updates its own property', async () => {
    const el = await mount('candor-checkbox');
    const received: boolean[] = [];
    document.body.addEventListener('changed', (e) => received.push((e as CustomEvent).detail));

    const input = el.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(received).toEqual([true]);
    expect(el.checked).toBe(true);
  });

  it('emits a composed, bubbling event so it escapes nested markup', async () => {
    const el = await mount('candor-checkbox');
    let event: CustomEvent | null = null;
    document.body.addEventListener('changed', (e) => (event = e as CustomEvent));

    const input = el.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(event!.bubbles).toBe(true);
    expect(event!.composed).toBe(true);
  });

  it('re-renders when checked is set programmatically', async () => {
    const el = await mount('candor-checkbox');
    expect(el.querySelector('input')!.checked).toBe(false);

    await update(el, { checked: true });
    expect(el.querySelector('input')!.checked).toBe(true);
  });
});
