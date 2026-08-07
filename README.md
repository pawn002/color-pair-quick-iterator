# Color Pair Quick Iterator

A Lit web-component application for exploring and iterating on accessible color pairs. Built around **OKCA** — an OKLCH-native contrast algorithm with zero false passes against WCAG 2.x.

**Live Application**: https://pawn002.github.io/color-pair-quick-iterator/

## Features

- **OKCA Contrast**: Primary contrast algorithm — OKLCH-native, 1–21 scale (20.9 ceiling), zero false passes against WCAG 2.x, stricter for saturated chromatic colors
- **APCA Support**: Accessible Perceptual Contrast Algorithm for perceptual contrast scoring
- **WCAG Compatibility**: Bridge-PCA provides WCAG 2.x ratio equivalents
- **Color Space**: Works in OKLCH color space for perceptually uniform adjustments
- **Interactive Sliders**: Adjust lightness while maintaining chroma for fine-tuned color exploration
- **Color Palettes**: Generate tables of color variants with different lightness and chroma values
- **Shareable URLs**: State is persisted in URL query parameters for easy sharing

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (Vite)
npm start

# Run tests once (vitest, exits with a status code)
npm test

# Type-check — `npm run build` does NOT do this
npm run typecheck

# Build for production
npm run build
```

Visit `http://localhost:5173` after starting the development server.

Requires Node 20 or 22. Tests run in Node under jsdom — no browser needed.

## Tests

238 tests across 9 files, on vitest. See the [Testing Documentation](./documentation/testing.md).

Run all three gates before pushing — CI runs the same ones:

```bash
npm run typecheck && npm test && npm run build
```

## Documentation

Comprehensive documentation is available in the [`documentation/`](./documentation) directory:

- **[Getting Started](./documentation/getting-started.md)** - Setup and installation
- **[Architecture](./documentation/architecture.md)** - Project structure, patterns, and URL state management
- **[Components](./documentation/components.md)** - Component API reference
- **[Services](./documentation/services.md)** - Service documentation and color algorithms
- **[Contributing](./documentation/contributing.md)** - Code style and contribution guidelines
- **[Testing](./documentation/testing.md)** - vitest patterns and the guard specs
- **[Deployment](./documentation/deployment.md)** - Build and deployment process
- **[Candor Release Findings](./documentation/candor-release-findings.md)** - Historical record of the March 2026 design-system migration

For AI-assisted development, see [CLAUDE.md](./CLAUDE.md) for project-specific guidance.

## Technology Stack

- **Lit 3.2** - Web components; every locally-authored element renders into the light DOM
- **Vite 6** - Build tooling and development server; also carries the vitest config
- **vitest 3.2** + **jsdom** - Tests, in Node, with no browser
- **@candor-design/web-components 5.0.1** - Design-system primitives (shadow DOM)
- **@candor-design/tokens 5.0.1** - Design tokens as CSS custom properties
- **TypeScript 5.7** - Strict type checking
- **colorjs.io 0.5.2** - Color space conversions in OKLCH
- **@pawn002/okca** - OKCA contrast algorithm (primary)
- **apca-w3 0.1.9** - APCA contrast algorithm
- **bridge-pca 0.1.6** - WCAG 2.x compatibility layer (partial implementation)
- **d3 7.9.0** - Scale utilities for contrast-to-size mapping

See [Architecture Overview](./documentation/architecture.md) for details.

## Key Concepts

### OKLCH Color Space

All color manipulation uses OKLCH (Oklab Lightness Chroma Hue) for perceptually uniform adjustments. This ensures that equal changes in values produce equal perceptual differences.

### OKCA — the primary algorithm

OKCA (OK Contrast Algorithm) is the default contrast mode. It outputs ratios on the familiar 1–21 scale with the same AA (4.5) and AAA (7.0) thresholds as WCAG, while correcting a known WCAG failure mode:

**Saturated chromatic false passes** — hot pink on near-black can score 6.6:1 under WCAG but is demonstrably harder to read. OKCA applies a chroma penalty that reduces the ratio for vivid colors (that pair scores 3.6). It is also polarity-aware: light-on-dark and dark-on-light pairs score differently, capped at 20.9 and 20 respectively. The light-on-dark ceiling sits just below WCAG's 21 so that every OKCA score is *strictly* under the WCAG equivalent.

OKCA never approves a pair that WCAG rejects (FP = 0, proven for sRGB), making it a strictly stricter, drop-in alternative.

### APCA, Bridge-PCA, and Delta E

The app also supports APCA (perceptual contrast scores on ~0–108 scale), Bridge-PCA (WCAG 2.x ratio approximation from APCA), and Delta E (CIE 2000 perceptual color difference). Learn more in the [Services Documentation](./documentation/services.md).

### URL State Management

The app persists state in query parameters (`fg`, `bg`, `type`, `chroma`, `gradient`). Share URLs to reproduce exact color combinations. See [Architecture - URL State Management](./documentation/architecture.md#url-state-management).

## Project Structure

```
index.html                # Vite entry point — loads src/main.ts
src/
├── main.ts               # Registers Candor elements; imports fonts and global styles
├── styles.scss           # Global styles and typography rules
└── app/
    ├── app.ts            # <cc-app> root element — owns all state and URL sync
    ├── _components/      # App components, all `cc-*` (picker, slider, contrast, metadata, table)
    └── services/         # Business logic (ColorUtil, ColorMetrics, Bpca)

Design-system primitives are `candor-*` elements imported from
@candor-design/web-components in src/main.ts — there is no local copy.
```

The `cc-*` / `candor-*` prefix split is load-bearing, not cosmetic: the package has a
single entry point, so one import registers all of its elements, and a local element
reclaiming a `candor-*` name throws on registration and takes the rest down with it.

See [Architecture Documentation](./documentation/architecture.md) for the complete
structure.

## Deployment

Push to `main`. `.github/workflows/deploy.yml` type-checks, tests, builds, and publishes
to GitHub Pages via `actions/deploy-pages` using OIDC — no stored secrets, no manual
deploy script, and no committed build output.

See [Deployment Documentation](./documentation/deployment.md).

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./documentation/contributing.md) for:
- Lit conventions (properties, reactive state, custom events)
- Candor design system conventions and token usage
- Code style and formatting (Prettier configuration)
- Component and service patterns
- Testing requirements

## License

**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**

- ✅ Use, modify, and build upon this work non-commercially
- ✅ Give appropriate credit to the original author
- ✅ Share derivative works under the same license
- ❌ Commercial use requires explicit permission

See [LICENSE](./LICENSE) for full details.

## Useful Links

- **Live Application**: https://pawn002.github.io/color-pair-quick-iterator/
- **Myndex APCA Tool**: https://apcacontrast.com/
- **APCA Repository**: https://github.com/Myndex/apca-w3
- **Bridge-PCA Repository**: https://github.com/Myndex/bridge-pca
- **OKLCH Color Space**: https://oklch.com/
- **colorjs.io Documentation**: https://colorjs.io/

## Acknowledgments

- **OKCA** — developed for this project; an OKLCH-native contrast algorithm with zero WCAG false passes
- **APCA and Bridge-PCA** — developed by Andrew Somers (Myndex)

---

## Recent Updates

- **2026-03**: Integrated Candor design system — added a local `_candor/` directory of primitives (since replaced by the published package)
- **2026-03**: Removed legacy token alias variables (`--mono-font`, `--body-font`, etc.); all styles now reference Candor tokens directly
- **2026-03**: AlertComponent updated to use ToastComponent for visual output
- **2026-03**: MetadataComponent tables wrapped with `<app-table [compact]="true">`
- **2026-03**: AccordionItemComponent `variant` input replaces old boolean `subtle` input
- **2026-03**: TonePickerComponent gains `hideHeaders` input; added `hideUi` input
- **2026-04**: Added ModalComponent (`app-modal`) to Candor; replaced accordion anchor links with contextual info buttons and modals throughout the app
- **2026-04**: Upgraded `@pawn002/okca` to 1.0.1 (ESM, polarity-aware caps); OKCA is now the default contrast type
- **2026-04**: Fixed checkbox double-toggle bug; fixed tooltip mobile overflow via `@media (hover: none)`
- **2026-08**: Migrated to the published Candor design system. `@candor-design/tokens` 1.0.1 → 5.0.1 (which fixed a latent bug where `--font-sans` named a font family that was never registered, so the app had been silently falling back to `serif`), and the nine local `_candor/` primitives were replaced by `@candor-design/web-components` 5.0.1. Local components moved to the `cc-*` prefix, which is load-bearing: the package registers all of its elements from one entry point, so a shared name breaks registration. The swap also fixed #151 — `<slot>` does nothing in the light DOM, so every local primitive had been dropping its authored content beside the control instead of inside it
- **2026-08**: Upgraded `@pawn002/okca` to 2.0.2. v2.0.0 recalibrated the algorithm — mid-tone neutrals and brand chromatics score roughly +0.4–0.5 higher, the white/`#767676` anchor moved 3.5 → 3.9, and the light-on-dark cap dropped from 21 to 20.9 so every score sits strictly below WCAG. Saturated-colour catches are unchanged; AA (4.5) and AAA (7.0) thresholds are unchanged
- **2026-08**: Screen-reader pass fixed six defects — a skip link whose target now takes focus, persistent live regions in `cc-alert` and `cc-color-contrast` (a region created already-populated does not reliably announce), mode-aware contrast announcements, `aria-valuetext` that tracks the slider thumb, and distinct host/input ids so `label[for]` reaches the range input. Toasts moved to `candor-toast-container`, Candor's documented outlet
- **2026-08**: Added CI/CD. Three workflows: `ci.yml` (build + test on Node 20 and 22, plus a separate `typecheck` job), `deploy.yml` (Pages via `actions/deploy-pages` and OIDC), and `draft-release.yml`. Adding `npm run typecheck` revealed that **nothing in this repo had ever type-checked** — `vite build` strips types without invoking the compiler — and immediately surfaced two real errors that had been sitting unread
- **2026-08**: Retired the manual deploy path. Pages now builds from Actions rather than a committed `docs/` directory; both the directory and the `deploy:gh-pages` script are gone
- **2026-08**: Rewrote `documentation/` for the current stack. The guides had described Angular 20, Karma, and `ng serve` across two framework migrations
