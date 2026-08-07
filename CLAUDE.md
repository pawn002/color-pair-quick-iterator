# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Color Pair Quick Iterator (CQPI) is an Angular 20 application for exploring and iterating on accessible color pairs. It uses OKCA as its primary contrast algorithm — a polarity-aware, WCAG-compatible ratio in OKLCH color space — alongside APCA, Bridge-PCA, and Delta E to help designers find color combinations that meet accessibility standards.

## Developer Preferences

- Automatically use context7 for code generation and library documentation.

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

### What to Test

- **Services**:
  - Each public method with various inputs
  - Edge cases (null, undefined, empty strings, boundary values)
  - Integration with other services
  - Error handling

- **Components**:
  - Input/output behavior
  - User interactions and event handling
  - Integration with services (use spies)
  - Component state changes
  - Edge cases and error states

### Testing Workflow

1. Make code changes
2. Update/add corresponding tests
3. Run `npm run build` to verify TypeScript compilation
4. Run `npm test` — a single vitest run that exits with a status code. It runs in Node with no browser needed
5. Commit both implementation and test changes together

`npm test` is configured with `passWithNoTests: false`: a run that collects zero tests fails. This is deliberate — the Angular-era specs sat dead and uncollected for months after the Lit migration because `npm test` was watch mode and never exited.

### Test Coverage Examples

When adding a new option to a type union (e.g., adding 'deltaE' to ContrastType):
- Update the type definition
- Add tests in the service that handles the type
- Add tests in components that consume the type
- Add integration tests that verify the new option produces expected results
- Add edge case tests (e.g., null handling, identical inputs)

## Documentation Updates

When the user requests that the project's documentation be updated:

1. **Review and update all files in `documentation/`** - Ensure all markdown files reflect current implementation
2. **Update `README.md`** - Keep the main README in sync with detailed documentation
3. **Maintain consistency** - Ensure terminology, examples, and references are consistent across all documentation files

## Commands

```bash
npm start                  # Development server (vite)
npm run build              # Production build (generic, works anywhere)
npm run build:gh-pages     # Build for this repo's GitHub Pages (output to dist/ only)
npm run deploy:gh-pages    # Build, copy to docs/, commit, and push — full deploy to GitHub Pages
npm test                   # Run unit tests once with vitest (exits with a status code)
npm run test:watch         # Run vitest in watch mode
```

## Architecture

### URL State Management

State lives in query parameters so a URL restores the exact app state:

- **Query parameters**: `fg` (foreground), `bg` (background), `type`, `chroma`, `gradient`
- **State synchronization**: `_updateUrl()` in `app.ts` writes them via `history.replaceState`
- **Initial load**: restores from the URL, or generates a random passing pair
- **Shareable URLs**: users can hand someone a link that reproduces what they see

### Core Services (`src/app/services/`)

- **ColorUtilService** - Color manipulation using colorjs.io in OKLCH color space. Handles color parsing, gamut mapping, variant generation, and chroma matching.
- **ColorMetricsService** - Calculates contrast scores using OKCA (primary, @pawn002/okca), APCA (apca-w3), Bridge-PCA, and Delta E algorithms.
- **BpcaService** - Bridge-PCA implementation for WCAG 2.x ratio approximation from APCA scores.

### Component Pattern

Components are Lit elements and live in `src/app/_components/`, with co-located files:
- `component-name.ts` - The Lit element: logic and template together via the `html` tagged template
- `component-name.component.scss` - Styles, imported directly by the `.ts` file. The `.component` in the name is a leftover from the Angular era; the file is live

There is no Storybook in this repo. The design-system primitives come from `@candor-design/web-components`, which publishes its own hosted catalog.

Locally-authored components render into the light DOM (`createRenderRoot() { return this; }`) so the global token stylesheet applies. **A `<slot>` does nothing in the light DOM** — Lit appends its template *after* the authored children instead of projecting them. That was #151, and it is why none of these components use slots. If you need content projection, use a `candor-*` element or give the component a shadow root.

### Two namespaces: `cc-*` and `candor-*`

`candor-*` elements come from `@candor-design/web-components` and use shadow DOM. `cc-*` elements are authored in this repo. **The prefixes are load-bearing, not cosmetic:** the package has a single entry point with `sideEffects: true`, so importing it in `src/main.ts` registers all of its elements at once — there is no way to import just one. Any local element that reclaims a `candor-*` name throws on registration and takes the rest of the package's elements down with it, leaving a half-registered app. `src/app/candor-package.spec.ts` guards this.

Design tokens are plain custom properties on `:root`, so they inherit through shadow boundaries and styling works the same on both sides. Global SCSS that reaches *inside* a component does not — use the `--candor-*` theming hooks or `::part()`.

**`cc-table` is deliberately not `candor-table`.** The upstream element is data-driven (`headers: string[]`, `rows: { cells: string[] }[]`), and half the tables in `cc-metadata` put an interactive tooltip and info button inside a cell. A cell can only be text, so it also cannot carry the `outcome--pass` / `outcome--fail` class the results table needs. `cc-table` is a light-DOM wrapper that styles whatever `<table>` markup it is handed; the two solve different problems.

**Do not half-migrate the tables.** Two of the four in `cc-metadata` have no interactive cells and *could* move to `candor-table` today, but doing so puts two implementations side by side in one card, with mismatched headings — `candor-table` renders its `caption` visibly with no `::part` to hide it, while ours sits `sr-only` under an `<h3>`. Decided 2026-08-07 to wait for `pawn002/candor#258`, which would let all four migrate at once and delete `cc-table` entirely. Everything else already matches: value cells are identical, and the zebra stripe uses `--color-bg-surface`, the same token `candor-table` stripes with — so keep them pointed at the same token rather than reintroducing a literal.

Upstream API differences worth knowing before reaching for a `candor-*` element:
- **`heading`, never `title`** — `title` is a global HTML attribute and would render a browser tooltip instead of a label
- **`change`, not `changed`** — form controls emit `change` with the value/state as `detail`
- **`candor-button` emits nothing.** Bind `@click`; the inner button's native click retargets to the host
- **No `size="icon"`.** Use `class="button--icon"`, which sets the `--candor-button-*` hooks from `styles.scss`
- **`candor-card` clips whatever overflows it**, and `candor-tooltip` positions its bubble absolutely, so a tooltip inside a card is cut off at the card's edge. The card sets `overflow: hidden` on a shadow-DOM node exposed neither as a `::part` nor through a custom property — there is no CSS fix from this side. `candor-toolbar` is no better; its `overflow-x: auto` computes `overflow-y` to `auto`. Upstream as `pawn002/candor#259`; `candor-package.spec.ts` pins both facts so the workarounds below can be deleted when the bubble moves to the top layer

**A group of `candor-radio`s always gets a `<fieldset>` and a `<legend>`** — Candor's documented rule, and the Radio docs page is where it is written down, not the package. It is load-bearing, not presentational: the legend supplies the question context screen readers announce before each option, and `candor-radio` resolves its group as `closest('fieldset')` then `parentElement`. Every option in `app.ts` sits in its own `.radio-item` wrapper for the info button, so the fieldset is the only thing letting the group find itself — remove it and arrow keys *and* mutual exclusion both die with no error. `candor-package.spec.ts` pins the lookup. Reset `border`/`padding`/`margin` and set `min-width: 0`; a `<legend>` is shrink-to-fit, so it needs an explicit width before `text-align` does anything. `candor-radio` also leaves `tabindex="0"` on every option, which would make the group N tab stops instead of one — `_applyRovingTabIndex()` in `app.ts` sets `-1` on the unselected options after each render, so Tab enters at the current choice and leaves in one press while arrows move within. Delete it when `pawn002/candor#262` lands

**Typography follows Candor's four-voice system; the rules live in `styles.scss`.** `body` sets `--font-family-base` (Roboto Flex) as the document voice — without it, anything not matched by a rule falls to the UA serif, which is how a bare `div` once rendered Times New Roman. Roboto Flex is the *comprehension* voice and covers almost everything here: prose, headings, metric names, scores. `--font-family-accessible` (Atkinson Hyperlegible) is the *instructional* voice — "does the user need to read this precisely to know what to do next?" — and in this app that is `cc-alert` alone; every other Atkinson run on the page comes from inside a `candor-*` shadow root, where upstream applies the same rule to form labels. `--font-family-mono` stays on numeric table columns for digit alignment. Headings use the `--font-size-h1..h6` tokens shifted one level down (`h1` → `--font-size-h3`), because this is a dense single-screen utility and the sticky bar shares its row with the contrast readout — do not reach for `--font-size-lg`/`md`, which are body-scale tokens and previously left `h1` and `h2` both at 20px. **14px (`--font-size-sm`) is the floor for readable text**; `--font-size-xs` is decorative/non-text only. For supplementary text prefer `candor-text` over hand-rolled type — `variant="caption"` is Noto Sans italic by definition, so setting a font or style alongside it forks the system

**Icons come from Phosphor, inlined as raw `<path>` data.** Candor stipulates Phosphor but ships no icon set — the `ph*` constants in its `icons.d.ts` are its own component chrome and are not exported, so there is nothing to import (`pawn002/candor#260`). Source new glyphs from `@phosphor-icons/core` and paste the path into an `html` template next to `_INFO_SVG` in `app.ts`; prefer the `fill` weight to match what is already there, and keep the `viewBox="0 0 256 256"` Phosphor uses. Do not add the package as a dependency for one glyph, and do not hand-draw one — an off-system icon renders fine and never announces itself

**Point edge-adjacent tooltips inward.** A bubble is centred on its trigger, so a control at the edge of a card overhangs it and gets clipped. Every tooltip on an edge control names the direction that puts the bubble *into* the card — `position="right"` on the colour pickers (left edge), `position="left"` on the copy buttons and the Options info buttons (right edge), `position="right"` in `cc-metadata`. Only reach for a structural fix when no direction works: the quick-actions row is a tight horizontal group in a short card, where every bubble either overhangs the card or covers the neighbouring button, so it is a plain `<div>` styled from card tokens instead (see `app.scss`)

### Component stylesheets are global

Every `_components/*.component.scss` is a plain global stylesheet, because the component that imports it renders into the light DOM. **Top-level selectors must be prefixed with the component's own tag** (`cc-metadata .comp-container`, not `.comp-container`). Seven files once declared a bare `.comp-container` and silently overwrote each other. `_components/styles-scoping.spec.ts` enforces this.

### Key Dependencies

- **colorjs.io** - Color space conversions and gamut mapping
- **apca-w3** - APCA contrast calculation
- **bridge-pca** - WCAG ratio approximation (partial implementation in BpcaService due to dependency issues)
- **d3** - Scale utilities for contrast-to-size mapping

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Lit Conventions

There is no Angular here. The app was rewritten as Lit web components in commit `36bd8e2`; anything describing NgModules, signals, `inject()`, or the async pipe is describing a version of this repo that no longer exists.

### Components
- **`@customElement('cc-name')`** registers the element; declare it in `HTMLElementTagNameMap` at the bottom of the file so `document.createElement` and the test helpers stay typed
- **`@property()`** for public API, **`@state()`** for internal reactive state. Use `attribute: 'kebab-case'` when the attribute name differs from the property
- **`@property({ type: Boolean, reflect: true })`** when a stylesheet needs to select on it — reflecting beats adding a class in `connectedCallback`
- **`override createRenderRoot() { return this; }`** — every locally-authored component renders into the light DOM. See the slot caveat above

### Templates
- Native JS in the `html` tagged template: ternaries and `.map()`, not control-flow directives
- **`.prop=${}`** sets a property, **`attr=${}`** sets an attribute, **`?attr=${}`** toggles it, **`@event=${}`** listens. Objects and arrays must use `.prop`
- Derived values go in getters — they re-evaluate on each render, which is what you want

### Events
- Dispatch `CustomEvent` with `bubbles: true, composed: true` so it escapes nested markup and shadow roots
- Name events for what happened, not what to do: `note-requested`, `selected-color`

### Services
- Plain classes in `src/app/services/`, exported as a module-level singleton (`export const colorUtil = new ColorUtilService()`). There is no DI container — import the instance
- One responsibility per service

## Formatting

Prettier config in package.json: 100 char width, single quotes, Angular HTML parser.
