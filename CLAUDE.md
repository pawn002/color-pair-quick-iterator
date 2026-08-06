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

**`cc-table` is deliberately not `candor-table`.** The upstream element is data-driven (`headers: string[]`, `rows: { cells: string[] }[]`), and half the tables in `cc-metadata` put an interactive tooltip and info button inside a cell. `cc-table` is a light-DOM wrapper that styles whatever `<table>` markup it is handed; the two solve different problems.

Upstream API differences worth knowing before reaching for a `candor-*` element:
- **`heading`, never `title`** — `title` is a global HTML attribute and would render a browser tooltip instead of a label
- **`change`, not `changed`** — form controls emit `change` with the value/state as `detail`
- **`candor-button` emits nothing.** Bind `@click`; the inner button's native click retargets to the host
- **No `size="icon"`.** Use `class="button--icon"`, which sets the `--candor-button-*` hooks from `styles.scss`

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
