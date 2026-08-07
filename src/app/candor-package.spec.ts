/**
 * Guards the boundary between the app's own primitives and the upstream
 * Candor package.
 *
 * The package ships a single entry point with `sideEffects: true`, so importing
 * it registers all of its elements at once — there is no way to pull in just
 * one. Every local primitive that shared a `candor-*` name was therefore
 * renamed to `cc-*`; if one ever drifts back, the import below throws
 * "This name has already been registered in the registry." and takes the rest
 * of the package's registrations down with it, leaving a half-registered app.
 */

import { describe, it, expect, afterEach } from 'vitest';
import '@candor-design/web-components';
import './_candor/accordion/accordion-item';
import './_candor/button/button';
import './_candor/form/checkbox/checkbox';
import './_candor/form/radio/radio';
import './_candor/modal/modal';
import './_candor/table/table';
import './_candor/toast/toast';
import './_candor/tooltip/tooltip';
import { mount, cleanup } from './test-utils';

afterEach(cleanup);

const LOCAL_PRIMITIVES = [
  'cc-accordion-item',
  'cc-button',
  'cc-checkbox',
  'cc-modal',
  'cc-radio',
  'cc-table',
  'cc-toast',
  'cc-tooltip',
];

describe('candor package integration', () => {
  it('registers the upstream elements the app renders', () => {
    expect(customElements.get('candor-card')).toBeDefined();
  });

  it('registers elements declared after the collision-prone ones', () => {
    // The registry is populated in module order and aborts on the first
    // duplicate, so an element from the tail of the bundle is the real proof
    // that nothing collided part-way through.
    expect(customElements.get('candor-tone-picker')).toBeDefined();
  });

  it('keeps every local primitive out of the candor-* namespace', () => {
    for (const tag of LOCAL_PRIMITIVES) {
      expect(customElements.get(tag), `${tag} is not registered`).toBeDefined();
      expect(customElements.get(tag.replace('cc-', 'candor-'))).not.toBe(customElements.get(tag));
    }
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
