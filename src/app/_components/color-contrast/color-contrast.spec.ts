import { describe, it, expect, afterEach, vi } from 'vitest';
import './color-contrast';
import { colorMetrics } from '../../services/color-metrics.service';
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

  // The number means a different thing per mode; announcing all five as
  // "Contrast score" mislabelled three of them.
  describe('announcement wording per contrast type', () => {
    it('names the object dimension rather than calling it a score', async () => {
      const el = await mount('cc-color-contrast', {
        colorOne: '#000000',
        colorTwo: '#ffffff',
        contrastType: 'apca object',
      });

      expect(el.contrastAnnouncement).toMatch(/^Minimum object dimension: [\d.]+ pixels$/);
    });

    it('names Delta E rather than calling it a score', async () => {
      const el = await mount('cc-color-contrast', {
        colorOne: '#000000',
        colorTwo: '#ffffff',
        contrastType: 'deltaE',
      });

      expect(el.contrastAnnouncement).toBe('Delta E: 100');
    });

    it('still calls the ratio modes a contrast score', async () => {
      const el = await mount('cc-color-contrast', { colorOne: '#ffffff', colorTwo: '#000000' });
      expect(el.contrastAnnouncement).toBe('Contrast score: 20.9');
    });
  });

  // The display shows "!" when no object is renderable at any size. The
  // announcement used to say "Contrast score: 0" for the same state.
  it('announces the object fallback to match the "!" on screen', async () => {
    const el = await mount('cc-color-contrast', {
      colorOne: '#808080',
      colorTwo: '#808080',
      contrastType: 'apca object',
    });

    expect(score(el)).toBe('!');
    expect(el.contrastAnnouncement).toBe('Contrast too low for any object');
  });

  it('says so when a pair is present but will not score', async () => {
    // The "!" marker's other cause: a pair is set, but no score comes back.
    const spy = vi.spyOn(colorMetrics, 'getContrast').mockReturnValue(null);

    const el = await mount('cc-color-contrast', { colorOne: '#000000', colorTwo: '#ffffff' });

    expect(score(el)).toBe('!');
    expect(el.contrastAnnouncement).toBe('Contrast score unavailable');
    spy.mockRestore();
  });
});
