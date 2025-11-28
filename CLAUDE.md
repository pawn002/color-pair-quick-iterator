# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Color Pair Quick Iterator (CQPI) is an Angular 20 application for exploring and iterating on accessible color pairs. It uses perceptual color contrast algorithms (APCA and Bridge-PCA) to help designers find color combinations that meet accessibility standards.

## Developer Preferences

- Automatically use context7 for code generation and library documentation.

## Commands

```bash
npm start          # Development server (ng serve)
npm run build      # Production build
npm test           # Run unit tests with Karma
npm run storybook  # Launch Storybook on port 6006
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
- **ColorMetricsService** - Calculates contrast scores using APCA (apca-w3) and Bridge-PCA algorithms.
- **BpcaService** - Bridge-PCA implementation for WCAG 2.x ratio approximation from APCA scores.

### Component Pattern

Components live in `src/app/_components/` with co-located files:
- `component-name.component.ts` - Logic with signals
- `component-name.html` - Template
- `component-name.scss` - Styles
- `component-name.stories.ts` - Storybook stories

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
