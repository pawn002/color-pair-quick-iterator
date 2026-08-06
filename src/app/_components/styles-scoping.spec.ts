/**
 * The app's own components render into the light DOM, so each
 * `*.component.scss` they import becomes a plain global stylesheet — nothing
 * scopes it to the component that owns it. Seven of them declared a bare
 * `.comp-container`, and the last one to load won.
 *
 * That is how `container-type: size` from cc-color-contrast ended up applying
 * to cc-metadata, collapsing it to 2px tall with 604px of content spilling out.
 * It went unnoticed for as long as the surrounding card let the overflow paint;
 * `candor-card` sets `overflow: hidden`, so the metadata tables simply vanished.
 *
 * This pins the fix: every top-level selector must name its own host element.
 * It is a lint expressed as a test because the failure it prevents is invisible
 * in a unit test and easy to miss in review.
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Read from disk rather than importing: Vite compiles `.scss` on import, and
// the nesting this test inspects is gone by the time it would see it.
const COMPONENTS_DIR = dirname(fileURLToPath(import.meta.url));

const stylesheets = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => ({
    host: `cc-${entry.name}`,
    path: join(COMPONENTS_DIR, entry.name, `${entry.name}.component.scss`),
  }))
  .filter((sheet) => existsSync(sheet.path))
  .map((sheet) => ({ ...sheet, source: readFileSync(sheet.path, 'utf8') }));

/** Selectors at column 0 — anything indented is nested inside one of these. */
function topLevelSelectors(source: string): string[] {
  return source
    .split('\n')
    .filter((line) => /^[^\s/}@]/.test(line) && line.includes('{'))
    .map((line) => line.slice(0, line.indexOf('{')).trim());
}

describe('component stylesheet scoping', () => {
  it('finds the component stylesheets', () => {
    expect(stylesheets.length).toBeGreaterThan(5);
  });

  it.each(stylesheets)('$host scopes every top-level selector to itself', ({ host, source }) => {
    const selectors = topLevelSelectors(source);
    expect(selectors.length).toBeGreaterThan(0);

    for (const selector of selectors) {
      expect(selector, `"${selector}" leaks outside ${host}`).toMatch(new RegExp(`^${host}\\b`));
    }
  });

  it('leaves no bare class selector able to reach another component', () => {
    const leaked = stylesheets.flatMap(({ host, source }) =>
      topLevelSelectors(source)
        .filter((selector) => !selector.startsWith(host))
        .map((selector) => `${host}: ${selector}`),
    );

    expect(leaked).toEqual([]);
  });
});
