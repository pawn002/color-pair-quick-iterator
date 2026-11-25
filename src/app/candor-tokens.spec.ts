/**
 * Every Candor token the app reads must exist, under a name that is not on its
 * way out.
 *
 * A custom property that does not resolve fails silently: `var(--gone)` makes the
 * declaration invalid at computed-value time, the property falls back to inherit
 * or initial, and nothing errors. Candor 7.0 renamed most colour tokens property
 * first (`--color-link` → `--color-text-link`) and kept the old names as
 * deprecated aliases until the next major, so today every old name still
 * resolves. 8.0 removes them. The first test catches that removal on the bump;
 * the second keeps deprecated names from coming back in the meantime.
 *
 * The package marks nothing as deprecated in a machine-readable form, so the
 * list below is copied from the **Deprecated** table in Candor's CHANGELOG for
 * 7.0.0. It is not exhaustive for names this app has never used.
 */

import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(scss|ts)$/.test(entry.name) && !entry.name.endsWith('.spec.ts') ? [path] : [];
  });
}

const sources = sourceFiles(SRC_DIR).map((path) => ({
  file: relative(SRC_DIR, path).replace(/\\/g, '/'),
  source: readFileSync(path, 'utf8'),
}));

const require = createRequire(import.meta.url);
const candorCss = readFileSync(require.resolve('@candor-design/tokens/candor-tokens.css'), 'utf8');

/** Properties the app declares itself, which Candor need not know about. */
const declaredLocally = new Set(
  sources.flatMap(({ source }) => [...source.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1])),
);

const references = sources.flatMap(({ file, source }) =>
  [...source.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => ({ file, token: m[1] })),
);

/** Deprecated in Candor 7.0.0, removed in 8.0. Old name → replacement. */
const DEPRECATED: Record<string, string> = {
  '--font-size-base': '--font-size-md',
  '--color-action-destructive': '--color-bg-action-destructive',
  '--color-action-destructive-active': '--color-bg-action-destructive-active',
  '--color-action-destructive-border': '--color-border-action-destructive',
  '--color-action-destructive-hover': '--color-bg-action-destructive-hover',
  '--color-action-destructive-text': '--color-text-action-destructive',
  '--color-action-primary': '--color-text-accent (or a border/fill/ring role)',
  '--color-action-primary-active': '--color-bg-action-primary-active',
  '--color-action-primary-hover': '--color-bg-action-primary-hover',
  '--color-action-secondary': '(no replacement)',
  '--color-action-secondary-active': '(no replacement)',
  '--color-action-secondary-hover': '(no replacement)',
  '--color-action-tertiary': '--color-bg-action-tertiary',
  '--color-action-tertiary-hover': '--color-bg-action-tertiary-hover',
  '--color-action-tertiary-text': '--color-text-action-tertiary',
  '--color-bg-forward': '--color-bg-content',
  '--color-bg-recede': '--color-bg-chrome',
  '--color-bg-subtle': '--color-bg-hover',
  '--color-blockquote-text': '--color-text-blockquote',
  '--color-callout-bg': '--color-bg-callout',
  '--color-focus': '--color-ring-focus',
  '--color-link': '--color-text-link',
  '--color-link-hover': '--color-text-link-hover',
  '--color-link-visited': '--color-text-link-visited',
  '--color-overlay': '--color-bg-scrim',
  '--color-slider-thumb': '--color-fill-slider-thumb',
  '--color-status-error': '--color-icon-error',
  '--color-status-error-bg': '--color-bg-error',
  '--color-status-error-text': '--color-text-error',
  '--color-status-success': '--color-icon-success',
  '--color-status-success-bg': '--color-bg-success',
  '--color-status-success-text': '--color-text-success',
  '--color-status-warning': '--color-icon-warning',
  '--color-status-warning-bg': '--color-bg-warning',
  '--color-status-warning-text': '--color-text-warning',
  '--color-text-inverse': '--color-text-on-inverse',
  '--color-toast-message': '--color-text-toast',
  '--tracking-tight': '--letter-spacing-* role',
  '--tracking-normal': '--letter-spacing-* role',
  '--tracking-wide': '--letter-spacing-* role',
};

/** `--text-xs` … and `--font-sans` …: primitives renamed to `--type-*` / `--typeface-*`. */
const DEPRECATED_PATTERN = /^--(text-(xs|sm|base|md|lg|xl|2xl|3xl)|font-(sans|accessible|mono|reading|serif))$/;

describe('Candor tokens the app reads', () => {
  it('finds the references', () => {
    expect(references.length).toBeGreaterThan(20);
  });

  it('are all defined by the installed @candor-design/tokens', () => {
    const missing = references.filter(
      ({ token }) => !declaredLocally.has(token) && !candorCss.includes(`${token}:`),
    );
    expect(missing).toEqual([]);
  });

  it('use no name Candor 7 deprecated', () => {
    const deprecated = references
      .filter(({ token }) => token in DEPRECATED || DEPRECATED_PATTERN.test(token))
      .map(({ file, token }) => `${file}: ${token} → ${DEPRECATED[token] ?? '--type-* / --typeface-*'}`);
    expect(deprecated).toEqual([]);
  });

  it('every deprecated name in the list still resolves in 7.x', () => {
    // If this fails, Candor has removed the aliases (8.0) and the list above has
    // done its job: the first test now guards the same ground.
    for (const token of Object.keys(DEPRECATED)) {
      expect(candorCss, token).toContain(`${token}:`);
    }
  });
});
