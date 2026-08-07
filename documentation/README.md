# Color Pair Quick Iterator — Documentation

Developer documentation for the Color Pair Quick Iterator (CPQI) project.

## Overview

CPQI is a **Lit 3** web-components application for exploring and iterating on accessible
color pairs. Its primary contrast algorithm is **OKCA** — an OKLCH-native ratio on the
familiar 1–21 scale with zero false passes against WCAG 2.x. APCA, Bridge-PCA, and
Delta E are also available for comparison.

**Live application**: https://pawn002.github.io/color-pair-quick-iterator/

> **There is no Angular here.** The app was rewritten as Lit web components in commit
> `36bd8e2`, and later migrated from a local `_candor/` directory to the published
> `@candor-design/*` packages. If you find a reference to `angular.json`, `ng build`,
> `ng serve`, NgModules, signals, `inject()`, Karma, or Jasmine, it describes a version
> of this repo that no longer exists.

## Documentation structure

### 1. [Getting Started](./getting-started.md)

Setup for a new developer:

- Prerequisites — Node 20 or 22, no browser needed for tests
- Installation and verification
- Running the Vite dev server on port 5173
- First steps: reading a component, reading a service
- Troubleshooting

### 2. [Architecture](./architecture.md)

How the pieces fit:

- Project structure and the light-DOM decision
- Component communication — properties down, custom events up
- Candor integration and the `cc-*` / `candor-*` split
- Service architecture as module singletons
- URL state via `URLSearchParams` and `history.replaceState`
- Build, deployment, dependencies, accessibility

### 3. [Services](./services.md)

The business logic:

- **ColorUtilService** — parsing, conversion, gamut work, variant generation
- **ColorMetricsService** — contrast across OKCA, APCA, Bridge-PCA, and Delta E
- **BpcaService** — the Bridge-PCA implementation
- Error-handling conventions and testing patterns

### 4. [Components](./components.md)

The UI:

- The eight `cc-*` elements, with their real properties and event names
- `candor-*` design-system elements, and the upstream gotchas this app works around
- Communication patterns, styling rules, accessibility details

### 5. [Contributing](./contributing.md)

Before you change anything:

- Development workflow and the verification steps
- **Lit conventions** — registration, light DOM, properties, templates, events
- Candor conventions, tokens, typography, icons, tooltip placement
- TypeScript standards
- Testing requirements, PR process, commit format

### 6. [Testing](./testing.md)

- vitest in jsdom — no browser, no Karma, no `TestBed`
- The `mount` / `flush` / `update` / `cleanup` helpers
- Service and component patterns
- The two guard specs, and why they exist
- CI

### 7. [Deployment](./deployment.md)

- Push to `main`; GitHub Actions does the rest
- Pages configuration, and why a green deploy job is not proof the site updated
- Verifying a deployment, rolling back, tagging a release

### 8. [Candor Release Findings](./candor-release-findings.md)

A historical record of the March 2026 design-system migration, kept for provenance. See
the note at the top of that file before acting on anything in it.

## Quick reference

### Commands

```bash
npm start                  # Vite dev server on http://localhost:5173
npm run build              # Production build to dist/ (portable, root-relative)
npm run build:gh-pages     # Build with the /color-pair-quick-iterator/ base path
npm run typecheck          # tsc --noEmit — the ONLY thing that type-checks this repo
npm test                   # Single vitest run, exits with a status code
npm run test:watch         # vitest in watch mode
npm run preview            # Serve the production build locally
```

**`npm run build` does not type-check.** `vite build` transpiles and strips types without
invoking the compiler, so a type error passes the build and ships. Run `npm run typecheck`
separately — CI does.

### Key technologies

- **Lit 3.2** — web components; every locally-authored element renders into the light DOM
- **Vite 6** — build tooling and dev server; also carries the vitest config
- **vitest 3.2** with **jsdom** — tests, in Node, with no browser
- **TypeScript 5.7** — strict mode
- **@candor-design/web-components 5.0.1** — design-system primitives (shadow DOM)
- **@candor-design/tokens 5.0.1** — design tokens as CSS custom properties
- **colorjs.io 0.5.2** — color space conversions and gamut mapping in OKLCH
- **@pawn002/okca 2.0.2** — OKCA, the primary contrast algorithm
- **apca-w3 0.1.9** — APCA
- **bridge-pca 0.1.6** — WCAG 2.x ratio approximation (partially reimplemented in
  `BpcaService`)
- **d3 7.9** — scale utilities for contrast-to-size mapping
- **lodash-es 4.17** — utility functions

## Project goals

1. **Accessibility first** — help designers create color combinations that meet and
   exceed WCAG guidelines
2. **Zero false passes** — OKCA is stricter than WCAG for saturated chromatic colors and
   never approves what WCAG rejects
3. **Developer experience** — intuitive tools for exploring color accessibility
4. **Education** — help users understand how color contrast and accessibility relate
5. **Shareable results** — URL-based state so a link reproduces exactly what you see

## Getting help

- [Getting Started](./getting-started.md) for setup problems
- [Architecture](./architecture.md) to understand the codebase
- [CLAUDE.md](../CLAUDE.md) — the project conventions in the form the AI tooling reads.
  It is kept current and is authoritative where these guides disagree with it
- Read the comments in the source. Where the code looks arbitrary it is usually recording
  a bug it is shaped to avoid, with an issue number attached

## Contributing

Please read the [Contributing Guidelines](./contributing.md) before opening a pull
request.

## License

Licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0
International (CC BY-NC-SA 4.0)**:

- ✅ Use, modify, and build upon this work non-commercially
- ✅ Give appropriate credit to the original author
- ✅ Share derivative works under the same license
- ❌ Commercial use requires explicit permission

See [LICENSE](../LICENSE) or
[creativecommons.org/licenses/by-nc-sa/4.0/](https://creativecommons.org/licenses/by-nc-sa/4.0/).
