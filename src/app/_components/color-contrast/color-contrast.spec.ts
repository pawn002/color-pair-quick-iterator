import { describe, it, expect, afterEach } from 'vitest';
import './color-contrast';
import { mount, update, cleanup } from '../../test-utils';

afterEach(cleanup);

const score = (el: Element) => el.querySelector('#contrast-score')!.textContent!.trim();

describe('cc-color-contrast', () => {
  it('registers the custom element', () => {
    expect(customElements.get('cc-color-contrast')).toBeDefined();
  });

  it('defaults to the okca contrast type', async () => {
    const el = await mount('cc-color-contrast');
    expect(el.contrastType).toBe('okca');
  });

  it('renders the OKCA light-on-dark cap for white on black', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#ffffff', colorTwo: '#000000' });
    expect(score(el)).toBe('20.9');
  });

  it('renders the OKCA dark-on-light ceiling for black on white', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#000000', colorTwo: '#ffffff' });
    expect(score(el)).toBe('20');
  });

  it('is polarity-aware — swapping the pair changes the score', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#ffffff', colorTwo: '#000000' });
    const lightOnDark = score(el);

    await update(el, { colorOne: '#000000', colorTwo: '#ffffff' });
    expect(score(el)).not.toBe(lightOnDark);
  });

  it('recomputes when the contrast type changes', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#000000', colorTwo: '#ffffff' });
    const okca = score(el);

    await update(el, { contrastType: 'apca' });
    expect(score(el)).not.toBe(okca);
  });

  it('maps "apca object" to a minimum object dimension', async () => {
    const el = await mount('cc-color-contrast', {
      colorOne: '#000000',
      colorTwo: '#ffffff',
      contrastType: 'apca object',
    });

    // A very high APCA score collapses to the smallest dimension, not a ratio.
    expect(Number(score(el))).toBeLessThan(2);
  });

  it('renders a fallback marker when inputs are missing', async () => {
    const el = await mount('cc-color-contrast');
    expect(score(el)).toBe('!');
  });

  it('announces the score to assistive tech via a live region', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#ffffff', colorTwo: '#000000' });
    const live = el.querySelector('[role="status"]')!;

    expect(live.getAttribute('aria-live')).toBe('polite');
    expect(live.textContent!.trim()).toBe('Contrast score: 20.9');
  });

  it('hides the decorative score container from assistive tech', async () => {
    const el = await mount('cc-color-contrast', { colorOne: '#ffffff', colorTwo: '#000000' });
    expect(el.querySelector('.comp-container')!.getAttribute('aria-hidden')).toBe('true');
  });

  it('leaves the announcement empty when there is no score', async () => {
    const el = await mount('cc-color-contrast');
    expect(el.contrastAnnouncement).toBe('');
  });
});
