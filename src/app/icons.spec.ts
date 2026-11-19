import { describe, it, expect, afterEach } from 'vitest';
import { render, type TemplateResult } from 'lit';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import * as icons from './icons';

/** Renders a glyph template into a detached container and returns its <svg>. */
function svgOf(template: TemplateResult): SVGSVGElement {
  const host = document.createElement('div');
  render(template, host);
  return host.querySelector('svg')!;
}

const entries = Object.entries(icons) as Array<[string, TemplateResult]>;

describe('icons', () => {
  it.each(entries)('%s is a Phosphor glyph: 256 grid, path data only, hidden from AT', (_, glyph) => {
    const svg = svgOf(glyph);
    expect(svg.getAttribute('viewBox')).toBe('0 0 256 256');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.classList.contains('icon')).toBe(true);

    const children = Array.from(svg.children).map((child) => child.localName);
    expect(children.length).toBeGreaterThan(0);
    expect(new Set(children)).toEqual(new Set(['path']));
  });

  it.each(entries)('%s names exactly one weight', (_, glyph) => {
    const weights = Array.from(svgOf(glyph).classList).filter((c) => c.startsWith('icon--'));
    expect(weights).toHaveLength(1);
    expect(['icon--fill', 'icon--bold', 'icon--regular']).toContain(weights[0]);
  });

  /**
   * Candor: a filled shape means you can act on it. Actions whose glyph has an
   * enclosed shape are fill; actions drawn only in strokes — arrows here — are
   * bold, because their fill form is not a real filled shape.
   */
  it.each([
    ['INFO', 'icon--fill'],
    ['COPY', 'icon--fill'],
    ['DICE_FIVE', 'icon--fill'],
    ['DROP_HALF', 'icon--fill'],
    ['PERSON_ARMS_SPREAD', 'icon--fill'],
    ['ARROWS_DOWN_UP', 'icon--bold'],
    ['ARROW_COUNTER_CLOCKWISE', 'icon--bold'],
  ])('%s is drawn at the weight its role calls for (%s)', (name, weight) => {
    const glyph = (icons as Record<string, TemplateResult>)[name];
    expect(glyph, `${name} is not exported`).toBeDefined();
    expect(svgOf(glyph).classList.contains(weight)).toBe(true);
  });
});

/**
 * Every glyph comes from icons.ts. An inline <svg> anywhere else is either a
 * duplicate of one already there or an off-system icon — and an off-system
 * icon renders fine and never announces itself, which is how the app ended up
 * with five glyph sources before this module existed.
 */
describe('icon sourcing', () => {
  const root = join(__dirname);

  function sourceFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts') ? [path] : [];
    });
  }

  it('draws no <svg> outside icons.ts', () => {
    const offenders = sourceFiles(root)
      .filter((file) => !file.endsWith('icons.ts'))
      .filter((file) => /<svg[\s>]/.test(readFileSync(file, 'utf8')))
      .map((file) => relative(root, file));

    expect(offenders).toEqual([]);
  });
});

afterEach(() => {
  document.body.innerHTML = '';
});
