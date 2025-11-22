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

## Angular 20 Conventions

This project follows modern Angular patterns:

- **Standalone components** - No NgModules; do not add `standalone: true` to decorators
- **Signals** - Use `signal()`, `computed()`, `input()`, `output()` for state
- **Native control flow** - Use `@if`, `@for`, `@switch` instead of structural directives
- **OnPush change detection** - Set `changeDetection: ChangeDetectionStrategy.OnPush`
- **inject()** - Use function injection instead of constructor injection
- **host bindings** - Use `host` object in decorators instead of `@HostBinding`/`@HostListener`

## Formatting

Prettier config in package.json: 100 char width, single quotes, Angular HTML parser.
