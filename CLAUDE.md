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

The app uses Angular's `Location` service (not Router) for query parameter-based state persistence:

- **Query parameters**: `fg` (foreground), `bg` (background), `type`, `chroma`, `gradient`
- **State synchronization**: Effect in `app.ts` updates URL when signals change
- **Initial load**: Restores state from URL or generates random colors
- **Shareable URLs**: Users can share URLs that restore exact app state

**Key pattern**: Use `signal()` for `isInitializing` flag to enable effect re-runs.

See `documentation/architecture.md` for detailed implementation.

### Core Services (`src/app/services/`)

- **ColorUtilService** - Color manipulation using colorjs.io in OKLCH color space. Handles color parsing, gamut mapping, variant generation, and chroma matching.
- **ColorMetricsService** - Calculates contrast scores using OKCA (primary, @pawn002/okca), APCA (apca-w3), Bridge-PCA, and Delta E algorithms.
- **BpcaService** - Bridge-PCA implementation for WCAG 2.x ratio approximation from APCA scores.

### Component Pattern

Components are Lit elements and live in `src/app/_components/` (app-specific) and `src/app/_candor/` (design-system primitives), with co-located files:
- `component-name.ts` - The Lit element: logic and template together via the `html` tagged template
- `component-name.component.scss` - Styles, imported directly by the `.ts` file. The `.component` in the name is a leftover from the Angular era; the file is live

There is no Storybook in this repo. The Candor design system publishes its own hosted component catalog, so the `_candor/` primitives are documented upstream rather than here.

Locally-authored components render into the light DOM (`createRenderRoot() { return this; }`) so the global Candor token stylesheet applies. Note this is why every `<slot>` in `_candor/` is inert — see #151.

### Two namespaces: `cc-*` and `candor-*`

`candor-*` elements come from `@candor-design/web-components` and use shadow DOM. `cc-*` elements are authored in this repo. **The prefixes are load-bearing, not cosmetic:** the package has a single entry point with `sideEffects: true`, so importing it in `src/main.ts` registers all of its elements at once — there is no way to import just one. Any local element that reclaims a `candor-*` name throws on registration and takes the rest of the package's elements down with it, leaving a half-registered app. `src/app/candor-package.spec.ts` guards this.

The migration (#149) is replacing the `_candor/` primitives with their upstream equivalents one at a time; `_candor/` shrinks to nothing when it finishes. Design tokens are plain custom properties on `:root`, so they inherit through shadow boundaries and styling works the same on both sides. Global SCSS that reaches *inside* a component does not.

### Key Dependencies

- **colorjs.io** - Color space conversions and gamut mapping
- **apca-w3** - APCA contrast calculation
- **bridge-pca** - WCAG ratio approximation (partial implementation in BpcaService due to dependency issues)
- **d3** - Scale utilities for contrast-to-size mapping

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular 20 Conventions

This project follows modern Angular patterns:

### Components and Modules
- **Standalone components** - No NgModules; do NOT set `standalone: true` in decorators (it's the default)
- **OnPush change detection** - Set `changeDetection: ChangeDetectionStrategy.OnPush`

### Signals and Reactivity
- **Signals** - Use `signal()`, `computed()` for state; use `update()` or `set()` (not `mutate()`)
- **Computed values** - Use `computed()` for derived state (prefer over getters)
- **Effects** - Use `effect()` for reactive side effects (DOM updates, logging, etc.)

### Component APIs
- **Inputs** - Use `input()` and `input.required()` functions instead of `@Input()` decorator
- **Outputs** - Use `output()` function instead of `@Output()` decorator
- **Two-way binding** - Use `model()` function for two-way binding (replaces `[(ngModel)]` pattern)
- **View queries** - Use `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()` instead of decorators

### Template Syntax
- **Native control flow** - Use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **Bindings** - Use `[class]` and `[style]` bindings instead of `ngClass`/`ngStyle`
- **Images** - Use `NgOptimizedImage` for static images (not for inline base64)
- **Observables** - Use the async pipe in templates to handle observables

### Dependency Injection
- **inject()** - Use `inject()` function instead of constructor injection
- **Services** - Use `providedIn: 'root'` for singleton services

### Forms
- **Reactive forms** - Prefer Reactive forms over Template-driven forms

### Host Bindings
- **host object** - Use `host` object in decorators instead of `@HostBinding`/`@HostListener`

### Change Detection
- **Zoneless mode** - App uses `provideZonelessChangeDetection()` for better performance

## Services

- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use `inject()` function instead of constructor injection

## Formatting

Prettier config in package.json: 100 char width, single quotes, Angular HTML parser.
