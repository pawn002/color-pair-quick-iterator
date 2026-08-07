import { describe, it, expect, afterEach } from 'vitest';
import './metadata';
import { mount, cleanup } from '../../test-utils';

afterEach(cleanup);

/** The three pass/fail cells, in row order: Text, Large Text, Non-text. */
const outcomes = (el: Element) =>
  Array.from(el.querySelectorAll('td.numeric'))
    .slice(0, 3)
    .map((cell) => ({
      text: cell.textContent!.trim(),
      pass: cell.classList.contains('outcome--pass'),
      fail: cell.classList.contains('outcome--fail'),
    }));

describe('cc-metadata outcome colouring', () => {
  it('marks each outcome so it carries a colour as well as a word', async () => {
    // Black on white: comfortably passes every threshold.
    const el = await mount('cc-metadata', { colorOne: '#000000', colorTwo: '#ffffff' });

    expect(outcomes(el)).toEqual([
      { text: 'pass', pass: true, fail: false },
      { text: 'pass', pass: true, fail: false },
      { text: 'pass', pass: true, fail: false },
    ]);
  });

  it('colours each row independently, and keeps the word (WCAG 1.4.1)', async () => {
    // Mid grey on white clears the 3.0 large-text and non-text floors but not
    // the 4.5 body-text one, so the three rows must not agree.
    const el = await mount('cc-metadata', { colorOne: '#777777', colorTwo: '#ffffff' });

    expect(outcomes(el)).toEqual([
      { text: 'fail', pass: false, fail: true },
      { text: 'pass', pass: true, fail: false },
      { text: 'pass', pass: true, fail: false },
    ]);
  });

  it('leaves cells unmarked when there is no outcome to report', async () => {
    // Colours too close to score at all: the outcome is null, not a failure,
    // and an empty cell must not be painted as though it were one.
    const el = await mount('cc-metadata', { colorOne: '#777777', colorTwo: '#7a7a7a' });

    expect(outcomes(el).map((c) => c.text)).toEqual(['', '', '']);
    expect(el.querySelectorAll('.outcome--pass, .outcome--fail')).toHaveLength(0);
  });
});
