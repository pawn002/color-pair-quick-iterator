# Color Pair Quick Iterator

An Angular 20 application for exploring and iterating on accessible color pairs using perceptual color contrast algorithms (APCA and Bridge-PCA).

**Live Application**: https://pawn002.github.io/color-pair-quick-iterator/

## Features

- **Perceptual Contrast**: Uses APCA (Accessible Perceptual Contrast Algorithm) for accurate accessibility assessment
- **WCAG Compatibility**: Bridge-PCA provides WCAG 2.x ratio equivalents
- **Color Space**: Works in OKLCH color space for perceptually uniform adjustments
- **Interactive Sliders**: Adjust lightness while maintaining chroma for fine-tuned color exploration
- **Color Palettes**: Generate tables of color variants with different lightness and chroma values
- **Shareable URLs**: State is persisted in URL query parameters for easy sharing

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests (324 tests, 100% passing)
npm test

# Launch Storybook
npm run storybook

# Build for production
npm run build
```

Visit `http://localhost:4200` after starting the development server.

## Test Coverage

The project has comprehensive test coverage with **324 passing tests** (100% pass rate):
- **Services**: 150 tests covering ColorUtilService, BpcaService, and ColorMetricsService
- **Components**: 174 tests covering all 7 components
- See [Testing Documentation](./documentation/testing.md) for details

## Documentation

Comprehensive documentation is available in the [`documentation/`](./documentation) directory:

- **[Getting Started](./documentation/getting-started.md)** - Setup and installation
- **[Architecture](./documentation/architecture.md)** - Project structure, patterns, and URL state management
- **[Components](./documentation/components.md)** - Component API reference
- **[Services](./documentation/services.md)** - Service documentation and color algorithms
- **[Contributing](./documentation/contributing.md)** - Code style and contribution guidelines
- **[Testing](./documentation/testing.md)** - Testing strategies
- **[Deployment](./documentation/deployment.md)** - Build and deployment process

For AI-assisted development, see [CLAUDE.md](./CLAUDE.md) for project-specific guidance.

## Technology Stack

- **Angular 20.3.0** - Modern Angular with signals and standalone components
- **Angular CLI 20.3.4** - Build tooling and development server
- **TypeScript 5.9.2** - Strict type checking
- **colorjs.io 0.5.2** - Color space conversions in OKLCH
- **apca-w3 0.1.9** - APCA contrast algorithm
- **bridge-pca 0.1.6** - WCAG 2.x compatibility layer (partial implementation)
- **d3 7.9.0** - Scale utilities for contrast-to-size mapping
- **Storybook 9.1.10** - Component documentation

See [Architecture Overview](./documentation/architecture.md) for details.

## Key Concepts

### OKLCH Color Space

All color manipulation uses OKLCH (Oklab Lightness Chroma Hue) for perceptually uniform adjustments. This ensures that equal changes in values produce equal perceptual differences.

### APCA vs WCAG 2.x

The app supports both modern APCA contrast scores and traditional WCAG 2.x ratios via Bridge-PCA. Learn more about contrast algorithms in the [Services Documentation](./documentation/services.md).

### URL State Management

The app uses Angular's `Location` service to persist state in query parameters (`fg`, `bg`, `type`, `chroma`, `gradient`). Share URLs to reproduce exact color combinations. See [Architecture - URL State Management](./documentation/architecture.md#url-state-management).

## Project Structure

```
src/app/
├── _components/          # UI components (color picker, slider, contrast, etc.)
├── services/            # Business logic (ColorUtil, ColorMetrics, Bpca)
├── app.ts               # Root component with state management
└── app.config.ts        # Application configuration
```

See [Architecture Documentation](./documentation/architecture.md) for complete structure.

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./documentation/contributing.md) for:
- Angular 20 conventions (signals, standalone components, zoneless mode)
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

Built with modern perceptual contrast algorithms developed by Andrew Somers (Myndex):
- APCA (Accessible Perceptual Contrast Algorithm)
- Bridge-PCA (WCAG 2.x compatibility layer)

---

## Recent Updates

- **2025-01**: Increased component style budget to 6kB, optimized app.scss
- **2025-01**: Migrated from lodash to lodash-es for ESM compatibility
- **2025-01**: Changed baseHref to portable default, added build:gh-pages script
- **2025-01**: Comprehensive documentation update

---

_Built with [Angular CLI](https://github.com/angular/angular-cli) version 20.3.4_
