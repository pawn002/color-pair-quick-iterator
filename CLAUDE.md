# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Color Pair Quick Iterator (CPQI) is a Lit 3 web-components application, built with Vite, for exploring and iterating on accessible color pairs. It uses OKCA as its primary contrast algorithm — a polarity-aware, WCAG-compatible ratio in OKLCH color space — alongside APCA, Bridge-PCA, and Delta E to help designers find color combinations that meet accessibility standards.

## Testing Requirements

**CRITICAL**: When modifying or adding code, ALWAYS update the corresponding test files.

### Test File Locations

Tests run on **vitest** (not Karma/Jasmine). Use `vi.spyOn(...).mockReturnValue(...)` and `expect.objectContaining` / `expect.any` — the Jasmine equivalents (`spyOn(...).and.returnValue`, `jasmine.*`) are not available.

- **Services**: `src/app/services/*.spec.ts` - Test files co-located with service files. Services are plain classes; instantiate them directly (`new ColorUtilService()`) — there is no DI container
- **Components**: `src/app/_components/*/component-name.spec.ts` - Test files co-located with the Lit component (`component-name.ts`, *not* `component-name.component.ts` — those were the Angular versions and have been removed)

### When to Update Tests

1. **Adding new features**: Create comprehensive tests covering the new functionality
2. **Modifying existing code**: Update related tests to reflect changes
3. **Adding new parameters or types**: Add test cases for all new values/types
4. **Changing service methods**: Update service tests and component tests that use those services

### Testing Workflow

1. Make code changes
2. Update/add corresponding tests
3. Run `npm run typecheck` to verify TypeScript. **`npm run build` does not do this** — `vite build` transpiles and strips types without ever invoking the compiler, so a type error passes the build and ships. Two real ones sat unread in `candor-package.spec.ts` until CI started checking
4. Run `npm run build` to verify the bundle actually builds
5. Run `npm test` — a single vitest run that exits with a status code. It runs in Node with no browser needed
6. Commit both implementation and test changes together

CI runs steps 3–5 on every push and PR to `main` (`.github/workflows/ci.yml`), so a miss is caught — but locally is cheaper than a red PR.

`npm test` is configured with `passWithNoTests: false`: a run that collects zero tests fails. This is deliberate — the Angular-era specs sat dead and uncollected for months after the Lit migration because `npm test` was watch mode and never exited.

## Deployment

**Deployment is automatic — push to `main`.** `.github/workflows/deploy.yml` type-checks, tests, builds, and publishes to GitHub Pages via `actions/deploy-pages`. There is no manual deploy script and no committed build output; the old `deploy:gh-pages` script and the `docs/` directory were removed once Pages moved to an Actions source. See `documentation/deployment.md`.

## Architecture

### URL State Management

State lives in query parameters so a URL restores the exact app state:

- **Query parameters**: `fg` (foreground), `bg` (background), `type`, `chroma`, `gradient`
- **State synchronization**: `_updateUrl()` in `app.ts` writes them via `history.replaceState`
- **Initial load**: restores from the URL, or generates a random passing pair
- **Shareable URLs**: users can hand someone a link that reproduces what they see

`BpcaService` is a partial implementation of bridge-pca, because of dependency issues with the package.

### Component Pattern

Components are Lit elements and live in `src/app/_components/`, with co-located files:
- `component-name.ts` - The Lit element: logic and template together via the `html` tagged template
- `component-name.component.scss` - Styles, imported directly by the `.ts` file. The `.component` in the name is a leftover from the Angular era; the file is live

There is no Storybook in this repo. The design-system primitives come from `@candor-design/web-components`, which publishes its own hosted catalog.

Locally-authored components render into the light DOM (`createRenderRoot() { return this; }`) so the global token stylesheet applies. **A `<slot>` does nothing in the light DOM** — Lit appends its template *after* the authored children instead of projecting them. That was #151, and it is why none of these components use slots. If you need content projection, use a `candor-*` element or give the component a shadow root.

### Two namespaces: `cc-*` and `candor-*`

`candor-*` elements come from `@candor-design/web-components` and use shadow DOM. `cc-*` elements are authored in this repo. **The prefixes are load-bearing, not cosmetic:** `src/main.ts` imports the package root, which registers all of its elements at once. Since Candor 6.0 that registration is guarded — a tag that is already defined is skipped with a console warning instead of throwing — so a collision no longer takes the package down, but it is quieter, not harmless: whichever definition loads first owns the tag, and a local `candor-*` element would silently replace Candor's or be replaced by it. `src/app/candor-package.spec.ts` guards this. (6.0 also ships per-component entry points, `@candor-design/web-components/<name>`; the app still uses the root.)

Design tokens are plain custom properties on `:root`, so they inherit through shadow boundaries and styling works the same on both sides. Global SCSS that reaches *inside* a component does not — use the `--candor-*` theming hooks or `::part()`.

**`cc-table` predates cells that hold markup.** Through Candor 5.x `candor-table` cells were `string[]`, and half the tables in `cc-metadata` put an interactive tooltip and info button inside a cell — and the results table needs an `outcome--pass` / `outcome--fail` class on its cells. `cc-table` is a light-DOM wrapper that styles whatever `<table>` markup it is handed. Candor 6.0 closed `pawn002/candor#258`: a cell can now be a string, a `TemplateResult`, or a `Node`.

**Do not half-migrate the tables.** Moving some of the four tables in `cc-metadata` to `candor-table` and not others puts two implementations side by side in one card, with mismatched headings — check whether `candor-table` still renders its `caption` visibly before migrating, since ours sits `sr-only` under an `<h3>`. Decided 2026-08-07 to wait for `pawn002/candor#258`; that landed in 6.0, so all four can now move at once and `cc-table` can be deleted. Not done yet. Everything else already matches: value cells are identical, and the zebra stripe uses `--color-bg-surface`, the same token `candor-table` stripes with — so keep them pointed at the same token rather than reintroducing a literal.

Upstream API differences worth knowing before reaching for a `candor-*` element:
- **`heading`, never `title`** — `title` is a global HTML attribute and would render a browser tooltip instead of a label
- **`change`, not `changed`** — form controls emit `change` with the value/state as `detail`
- **`candor-button` emits nothing.** Bind `@click`; the inner button's native click retargets to the host
- **No `size="icon"`.** Use `class="button--icon"`, which sets the `--candor-button-*` hooks from `styles.scss`
- **`candor-card` clips with `overflow: clip`, overridable through `--candor-card-overflow`.** Never set it to `hidden` or `auto` on `.title-and-sliders`: either makes the card a scroll container, and the sticky score header inside it then rides the card off the screen instead of pinning to the viewport — what Candor 5.x did, and why that card was a plain div until 6.0. `candor-package.spec.ts` pins the `clip` default. Tooltips are not affected either way: since 6.0 the bubble is a popover in the top layer, so no ancestor clips it (`pawn002/candor#259`)

**A group of `candor-radio`s always gets a `<fieldset>` and a `<legend>`** — Candor's documented rule, and the Radio docs page is where it is written down, not the package. It is load-bearing, not presentational: the legend supplies the question context screen readers announce before each option, and `candor-radio` resolves its group as `closest('fieldset')` then `parentElement`. Every option in `app.ts` sits in its own `.radio-item` wrapper for the info button, so the fieldset is the only thing letting the group find itself — remove it and arrow keys *and* mutual exclusion both die with no error. `candor-package.spec.ts` pins the lookup. Reset `border`/`padding`/`margin` and set `min-width: 0`; a `<legend>` is shrink-to-fit, so it needs an explicit width before `text-align` does anything. Since Candor 6.0 the fieldset also makes the group one tab stop — Candor manages the roving tabindex and gives a fieldset holding one group `role="radiogroup"` (`pawn002/candor#262`). The app used to patch the tab stops itself; it no longer does

**Typography follows Candor's four-voice system; the rules live in `styles.scss`.** `body` sets `--font-family-base` (Roboto Flex) as the document voice — without it, anything not matched by a rule falls to the UA serif, which is how a bare `div` once rendered Times New Roman. Roboto Flex is the *comprehension* voice and covers almost everything here: prose, headings, metric names, scores. `--font-family-accessible` (Atkinson Hyperlegible) is the *instructional* voice — "does the user need to read this precisely to know what to do next?" — and in this app that is `cc-alert` alone; every other Atkinson run on the page comes from inside a `candor-*` shadow root, where upstream applies the same rule to form labels. `--font-family-mono` stays on numeric table columns for digit alignment. Headings use the `--font-size-h1..h6` tokens shifted one level down (`h1` → `--font-size-h3`), because this is a dense single-screen utility and the sticky bar shares its row with the contrast readout — do not reach for `--font-size-lg`/`md`, which are body-scale tokens and previously left `h1` and `h2` both at 20px. **14px (`--font-size-sm`) is the floor for readable text**; `--font-size-xs` is decorative/non-text only. For supplementary text prefer `candor-text` over hand-rolled type — `variant="caption"` is Noto Sans italic by definition, so setting a font or style alongside it forks the system

**Icons are Phosphor glyphs in `src/app/icons.ts`, and nowhere else.** Candor uses Phosphor but ships no icon set — its bundled glyphs are component chrome and are not exported (`pawn002/candor#260`). Copy the path from `@phosphor-icons/core` (`assets/<weight>/<name>-<weight>.svg`, `viewBox="0 0 256 256"`) into a new export there; do not add the package as a dependency, and never hand-draw a glyph — an off-system icon renders fine and never announces itself. `icons.spec.ts` fails on any `<svg>` outside that file. **Weight is meaning, not style** (Candor, "Icon weight semantics"): a filled shape means you can act on it, so `fill` is for actions whose glyph has an enclosed shape (info, copy, dice); `bold` is for actions drawn only in strokes — arrows, ✕, + — and for icons that inform (status, carets); `regular` only beside text that carries the meaning. The weight is the `icon--fill`/`icon--bold` class on the `<svg>`, and `styles.scss` sizes icon-only buttons from it to Candor's rule: fill at 1.75rem, bold at 1.25rem, 32px square, `--candor-button-ghost-color: var(--color-text-subtle)` on ghost buttons. An icon in a labelled button follows the button's text size instead

**Edge-adjacent tooltips point inward.** A bubble is centred on its trigger, so through Candor 5.x a control at the edge of a card had its bubble clipped by the card. Every tooltip on an edge control names the direction that puts the bubble *into* the card — `position="right"` on the colour pickers (left edge), `position="left"` on the copy buttons and the Options info buttons (right edge), `position="right"` in `cc-metadata`. Since 6.0 the bubble renders in the top layer and no card clips it, so that reason is gone; the directions stay because they also keep bubbles off the viewport edge at narrow widths. Revisit before adding more

### Component stylesheets are global

Every `_components/*.component.scss` is a plain global stylesheet, because the component that imports it renders into the light DOM. **Top-level selectors must be prefixed with the component's own tag** (`cc-metadata .comp-container`, not `.comp-container`). Seven files once declared a bare `.comp-container` and silently overwrote each other. `_components/styles-scoping.spec.ts` enforces this.

## Lit Conventions

There is no Angular here. The app was rewritten as Lit web components in commit `36bd8e2`; anything describing NgModules, signals, `inject()`, or the async pipe is describing a version of this repo that no longer exists.

### Components
- **`@customElement('cc-name')`** registers the element; declare it in `HTMLElementTagNameMap` at the bottom of the file so `document.createElement` and the test helpers stay typed
- **`@property()`** for public API, **`@state()`** for internal reactive state. Use `attribute: 'kebab-case'` when the attribute name differs from the property
- **`@property({ type: Boolean, reflect: true })`** when a stylesheet needs to select on it — reflecting beats adding a class in `connectedCallback`
- **`override createRenderRoot() { return this; }`** — every locally-authored component renders into the light DOM. See the slot caveat above

### Events
- Dispatch `CustomEvent` with `bubbles: true, composed: true` so it escapes nested markup and shadow roots
- Name events for what happened, not what to do: `note-requested`, `selected-color`

### Services
- Plain classes in `src/app/services/`, exported as a module-level singleton (`export const colorUtil = new ColorUtilService()`). There is no DI container — import the instance
- One responsibility per service
