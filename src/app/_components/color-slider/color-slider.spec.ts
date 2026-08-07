import { describe, it, expect, afterEach } from 'vitest';
import './color-slider';
import { mount, flush, cleanup } from '../../test-utils';

afterEach(cleanup);

/**
 * The lightness range is resolved asynchronously, so the input does not exist
 * on the first render. Settle the promise chain, then the re-render it queues.
 */
async function settled(el: Element) {
  await flush(el);
  await new Promise((resolve) => setTimeout(resolve, 0));
  await flush(el);
  return el.querySelector('input[type="range"]') as HTMLInputElement;
}

describe('cc-color-slider accessible naming', () => {
  it('gives the range input a name the label actually reaches', async () => {
    const el = await mount('cc-color-slider', {
      id: 'slider-0',
      label: 'Foreground lightness',
      color: '#639066',
    });
    const input = await settled(el);

    // `labels` is the browser's own view of the association — the thing that
    // was empty when the host and the input shared an id.
    expect(input.labels).toHaveLength(1);
    expect(input.labels![0].textContent!.trim()).toBe('Foreground lightness');
  });

  it('keeps the input id distinct from the host id', async () => {
    const el = await mount('cc-color-slider', { id: 'slider-0', color: '#639066' });
    const input = await settled(el);

    expect(el.id).toBe('slider-0');
    expect(input.id).not.toBe(el.id);
    // A duplicate makes label[for] resolve to whichever comes first in document
    // order — the host — and silently drops the input's name.
    expect(document.querySelectorAll(`[id="${input.id}"]`)).toHaveLength(1);
  });

  it('points the label at the input for either slider', async () => {
    const el = await mount('cc-color-slider', {
      id: 'slider-1',
      label: 'Background lightness',
      color: '#d1f7c3',
    });
    const input = await settled(el);
    const label = el.querySelector('label') as HTMLLabelElement;

    expect(label.htmlFor).toBe(input.id);
  });
});

describe('cc-color-slider value announcement', () => {
  it('moves aria-valuetext with the thumb', async () => {
    const el = await mount('cc-color-slider', { id: 'slider-0', color: '#639066' });
    const input = await settled(el);

    const before = input.getAttribute('aria-valuetext');

    // Drive it the way a keyboard user would: the browser writes the value,
    // then fires `input`.
    input.value = String(Number(input.max) - (Number(input.max) - Number(input.min)) / 10);
    input.dispatchEvent(new Event('input'));
    await flush(el);

    expect(input.getAttribute('aria-valuetext')).not.toBe(before);
  });

  it('reports the new position as a percentage', async () => {
    const el = await mount('cc-color-slider', { id: 'slider-0', color: '#639066' });
    const input = await settled(el);

    input.value = '0.42';
    input.dispatchEvent(new Event('input'));
    await flush(el);

    expect(input.getAttribute('aria-valuetext')).toBe('42%');
  });

  it('describes the input with its available range', async () => {
    const el = await mount('cc-color-slider', { id: 'slider-0', color: '#639066' });
    const input = await settled(el);

    const describedBy = input.getAttribute('aria-describedby')!;
    const description = el.querySelector(`#${describedBy}`)!;

    expect(description.textContent).toMatch(/^Lightness range: \d+% to \d+%$/);
  });
});
