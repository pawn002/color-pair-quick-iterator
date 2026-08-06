/**
 * Guards the boundary between the app's own primitives and the upstream
 * Candor package.
 *
 * The package ships a single entry point with `sideEffects: true`, so importing
 * it registers all of its elements at once — there is no way to pull in just
 * one. Any local element that reclaims a `candor-*` name throws
 * "This name has already been registered in the registry." on import and takes
 * the rest of the package's registrations down with it, leaving a
 * half-registered app.
 *
 * The rest of this file pins the parts of the upstream contract the app depends
 * on. These are not tests of Candor — they are the assumptions app.ts makes
 * about it, written down so a package upgrade that breaks one fails here rather
 * than in the UI.
 */

import { describe, it, expect, afterEach } from 'vitest';
import '@candor-design/web-components';
import './_components/table/table';
import { mount, update, cleanup } from './test-utils';

afterEach(cleanup);

describe('candor package integration', () => {
  it('registers the upstream elements the app renders', () => {
    for (const tag of [
      'candor-accordion-item',
      'candor-button',
      'candor-card',
      'candor-checkbox',
      'candor-modal',
      'candor-radio',
      'candor-toast',
      'candor-tooltip',
    ]) {
      expect(customElements.get(tag), `${tag} is not registered`).toBeDefined();
    }
  });

  it('registers elements declared after the collision-prone ones', () => {
    // The registry is populated in module order and aborts on the first
    // duplicate, so an element from the tail of the bundle is the real proof
    // that nothing collided part-way through.
    expect(customElements.get('candor-tone-picker')).toBeDefined();
  });

  it('keeps the app-authored elements out of the candor-* namespace', () => {
    expect(customElements.get('cc-table')).toBeDefined();
    expect(customElements.get('cc-table')).not.toBe(customElements.get('candor-table'));
  });
});

describe('candor-card', () => {
  it('renders into a shadow root rather than the light DOM', async () => {
    const el = await mount('candor-card');
    expect(el.shadowRoot).not.toBeNull();
    expect(el.shadowRoot!.querySelector('.card')).not.toBeNull();
  });

  it('projects authored content instead of appending beside it (#151)', async () => {
    const el = await mount('candor-card');
    const child = document.createElement('p');
    child.textContent = 'Color Metadata';
    el.appendChild(child);

    const slot = el.shadowRoot!.querySelector('slot:not([name])') as HTMLSlotElement;
    expect(slot.assignedElements()).toContain(child);
  });

  it('accepts the variant and padding values the app passes', async () => {
    const el = await mount('candor-card', { variant: 'elevated', padding: 'none' });
    expect(el.variant).toBe('elevated');
    expect(el.padding).toBe('none');
  });
});

describe('candor-button', () => {
  it('projects its label into the control, giving it an accessible name (#151)', async () => {
    const el = await mount('candor-button');
    el.textContent = 'Screen reader and low vision workflows';

    const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
    expect(slot.assignedNodes({ flatten: true })[0].textContent).toContain('Screen reader');
  });

  it('lets a native click reach a host listener — the app binds @click, not @clicked', async () => {
    const el = await mount('candor-button');
    let fired = 0;
    el.addEventListener('click', () => fired++);

    el.shadowRoot!.querySelector('button')!.click();
    expect(fired).toBe(1);
  });

  it('forwards aria-label to the inner control for icon-only buttons', async () => {
    const el = await mount('candor-button');
    el.setAttribute('aria-label', 'Swap Selected Colors');
    await update(el, {});

    expect(el.shadowRoot!.querySelector('button')!.getAttribute('aria-label')).toBe(
      'Swap Selected Colors',
    );
  });
});

describe('candor-checkbox', () => {
  it('emits change with the new state as detail', async () => {
    const el = await mount('candor-checkbox', { label: 'Constant chroma' });
    const received: boolean[] = [];
    el.addEventListener('change', (e) => received.push((e as CustomEvent).detail));

    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(received).toEqual([true]);
  });
});

describe('candor-radio', () => {
  it('emits change with the radio value as detail', async () => {
    const el = await mount('candor-radio', { value: 'okca', label: 'OKCA', name: 'contrastType' });
    const received: string[] = [];
    el.addEventListener('change', (e) => received.push((e as CustomEvent).detail));

    const input = el.shadowRoot!.querySelector('input')!;
    input.checked = true;
    input.dispatchEvent(new Event('change'));

    expect(received).toEqual(['okca']);
  });
});

describe('candor-accordion-item', () => {
  it('takes its visible label as `heading`, not `title`', async () => {
    // `title` is a global HTML attribute, so setting it would render a browser
    // tooltip and leave the summary blank.
    const el = await mount('candor-accordion-item', { heading: 'How to use this app.' });
    expect(el.shadowRoot!.textContent).toContain('How to use this app.');
  });
});
