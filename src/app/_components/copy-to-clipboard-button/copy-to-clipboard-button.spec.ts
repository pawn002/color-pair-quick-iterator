import { describe, it, expect, afterEach, vi } from 'vitest';
import './copy-to-clipboard-button';
import { mount, update, cleanup } from '../../test-utils';

afterEach(cleanup);

describe('cc-copy-to-clipboard-button', () => {
  it('draws the Phosphor copy glyph at fill weight, hidden from assistive tech', async () => {
    const el = await mount('cc-copy-to-clipboard-button', { color: '#639066', label: 'Copy foreground color' });
    const svg = el.querySelector('button > svg.icon')!;

    expect(svg).not.toBeNull();
    expect(svg.classList.contains('icon--fill')).toBe(true);
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });

  it('names the button with its label, since the glyph has no text', async () => {
    const el = await mount('cc-copy-to-clipboard-button', { color: '#639066', label: 'Copy foreground color' });
    expect(el.querySelector('button')!.getAttribute('aria-label')).toBe('Copy foreground color');
  });

  it('is disabled until it has a colour to copy', async () => {
    const el = await mount('cc-copy-to-clipboard-button', { label: 'Copy background color' });
    expect(el.querySelector('button')!.disabled).toBe(true);

    await update(el, { color: '#ffffff' });
    expect(el.querySelector('button')!.disabled).toBe(false);
  });

  it('copies its colour and reports it when clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });

    const el = await mount('cc-copy-to-clipboard-button', { color: '#639066', label: 'Copy foreground color' });
    const events: unknown[] = [];
    el.addEventListener('copy-event', (e) => events.push((e as CustomEvent).detail));

    el.querySelector('button')!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('639066'));
    expect(events).toHaveLength(1);
    vi.unstubAllGlobals();
  });
});
