# Architecture

This document describes the high-level architecture and design patterns used in the Color Pair Quick Iterator application.

## Overview

Color Pair Quick Iterator is built using **Angular 20** with modern patterns including signals, standalone components, and zoneless change detection. The architecture follows a service-oriented design where business logic is centralized in services, and components focus on presentation and user interaction.

## Architectural Principles

### 1. Standalone Components
- **No NgModules**: All components are standalone (default in Angular 20)
- **Direct imports**: Components import their dependencies directly
- **Simpler mental model**: No need to manage module hierarchies

### 2. Signal-Based Reactivity
- **Fine-grained reactivity**: Signals provide automatic dependency tracking
- **Computed values**: Derived state updates automatically
- **Effects**: React to signal changes for side effects
- **Reduces RxJS usage**: Signals handle most state management needs

### 3. Service-Oriented Business Logic
- **Separation of concerns**: Business logic lives in services, not components
- **Single responsibility**: Each service has a focused purpose
- **Dependency injection**: Services use `inject()` function
- **Singleton pattern**: Services are provided at root level

### 4. Zoneless Change Detection
- **Performance**: Zoneless mode reduces overhead
- **Explicit updates**: Uses signals and OnPush strategy
- **Predictable**: Change detection is more predictable and testable

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser (User)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    App Component (app.ts)                    │
│  - Root component orchestrating the application              │
│  - Manages global state (color pairs, contrast type, etc.)   │
│  - Handles user interactions and events                      │
└───┬─────────────────────┬─────────────────────┬─────────────┘
    │                     │                     │
    ▼                     ▼                     ▼
┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐
│ UI Components│  │   Services   │  │  External Libraries │
│              │  │              │  │                     │
│ - ColorPicker│  │ - ColorUtil  │  │ - colorjs.io        │
│ - ColorSlider│  │ - Metrics    │  │ - apca-w3           │
│ - Contrast   │  │ - Bpca       │  │ - bridge-pca        │
│ - Metadata   │  │              │  │ - d3                │
│ - PaletteTable│ │              │  │                     │
│ - Alert      │  │              │  │                     │
│ - CopyButton │  │              │  │                     │
└──────────────┘  └──────────────┘  └─────────────────────┘
       │                 │                     │
       └─────────────────┴─────────────────────┘
                         │
                         ▼
              Component Communication
              - Signals for state
              - Events for actions
              - Two-way binding for forms
```

## Project Structure

```
src/
├── app/
│   ├── _components/              # All UI components
│   │   ├── alert/
│   │   ├── color-contrast/
│   │   ├── color-picker/
│   │   ├── color-slider/
│   │   ├── copy-to-clipboard-button/
│   │   ├── metadata/
│   │   └── palette-table/
│   ├── services/                 # Business logic services
│   │   ├── color-util.service.ts
│   │   ├── color-metrics.service.ts
│   │   ├── bpca.service.ts
│   │   └── declarations.d.ts
│   ├── app.ts                    # Root component
│   ├── app.html                  # Root template
│   ├── app.scss                  # Root styles
│   └── app.config.ts             # Application configuration
├── stories/                      # Storybook demo components
├── main.ts                       # Application bootstrap
├── index.html                    # HTML entry point
└── styles.scss                   # Global styles
```

## Component Architecture

### Component Organization Pattern

Each component follows this co-location pattern:

```
component-name/
├── component-name.component.ts       # Logic (signals, methods)
├── component-name.html               # Template (native control flow)
├── component-name.scss               # Styles (component-scoped)
└── component-name.stories.ts         # Storybook documentation
```

### Component Communication

Components communicate using modern Angular patterns:

1. **Inputs**: Using `input()` function for one-way data binding
   ```typescript
   colorOne = input.required<Color>();
   ```

2. **Outputs**: Using `output()` function for events
   ```typescript
   selectedColor = output<Color>();
   ```

3. **Two-way binding**: Using `model()` for form controls
   ```typescript
   comparedColor = model<Color>();
   ```

4. **Signals**: For internal component state
   ```typescript
   uiColor = signal<Color>(someInitialValue);
   ```

5. **Computed signals**: For derived state
   ```typescript
   contrastScore = computed(() => calculateScore(this.colorOne(), this.colorTwo()));
   ```

### Component Hierarchy

```
AppComponent (Root)
├── ColorPickerComponent (x2)        - Select foreground/background colors
├── ColorSliderComponent (x2)        - Adjust color tone/lightness
├── ColorContrastComponent           - Display contrast score
├── MetadataComponent                - Show detailed color information
├── PaletteTableComponent (x2)       - Show color variant grid
├── CopyToClipboardButtonComponent   - Copy hex values
└── AlertComponent                   - Show user notifications
```

## Service Architecture

### Service Responsibilities

```
┌────────────────────────────────────────────────────────────┐
│                     ColorUtilService                        │
│  - Core color manipulation (parse, create, convert)        │
│  - Color space operations (OKLCH)                          │
│  - Gamut mapping for sRGB                                  │
│  - Chroma matching and variant generation                  │
│  - Random color pair generation                            │
└────────────────────┬───────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌──────────────────────┐  ┌──────────────────────┐
│ ColorMetricsService  │  │    BpcaService       │
│  - APCA calculation  │  │  - Bridge-PCA calc   │
│  - Bridge-PCA calc   │  │  - WCAG 2.x ratios   │
│  - Contrast lookup   │  │  - Luminance calc    │
└──────────────────────┘  └──────────────────────┘
```

### Service Dependencies

- **ColorMetricsService** depends on **ColorUtilService** and **BpcaService**
- **BpcaService** is standalone (no service dependencies)
- **ColorUtilService** is standalone (uses external libraries only)

All services use `providedIn: 'root'` for singleton behavior.

## Data Flow

### Typical User Interaction Flow

```
1. User selects color in ColorPicker
   │
   ▼
2. ColorPicker emits selectedColor event
   │
   ▼
3. AppComponent receives event
   │
   ▼
4. AppComponent updates signal (colorPickerOneSelectedColor)
   │
   ▼
5. Signal change propagates to dependent components via inputs
   │
   ├──▶ ColorContrastComponent (recalculates contrast via effect)
   ├──▶ MetadataComponent (recalculates metadata via computed)
   ├──▶ ColorSliderComponent (updates gradient)
   └──▶ PaletteTableComponent (updates table with new base color)
   │
   ▼
6. UI updates automatically (reactive system)
```

### State Management Strategy

**Primary State Location**: Root component (AppComponent)
- Foreground color (selected + compared)
- Background color (selected + compared)
- Contrast type ('apca' | 'bpca' | 'apca object')
- UI toggles (constantChroma, showGradient)
- Alert messages

**Component Local State**: Individual components
- UI-specific state (e.g., slider position, table selection)
- Temporary interaction state

**No Global Store**: Signal-based state in components is sufficient for this application's complexity.

## Color Space Strategy

### Why OKLCH?

The application uses **OKLCH color space** for all color manipulation:

1. **Perceptually uniform**: Equal changes in values produce equal perceptual differences
2. **Human-friendly**: Lightness, chroma (saturation), and hue are independent
3. **Wide gamut support**: Can represent colors outside sRGB
4. **Modern standard**: Part of CSS Color Level 4 specification

### Color Pipeline

```
User Input (Hex/RGB)
         ↓
   parseColor() → Color object in OKLCH
         ↓
   Manipulation (adjust lightness, chroma, hue)
         ↓
   Gamut Mapping (ensure sRGB compatibility)
         ↓
   Display (convert to RGB for rendering)
```

### Gamut Mapping

Colors are gamut-mapped to sRGB using:
```typescript
color.toGamut({ method: 'oklch.c', space: 'srgb' })
```

This reduces chroma (saturation) while preserving lightness and hue.

## Change Detection Strategy

### Zoneless Mode

The application uses **zoneless change detection** configured in `app.config.ts`:

```typescript
provideExperimentalZonelessChangeDetection()
```

**Benefits**:
- Reduced bundle size (no Zone.js)
- Better performance
- More predictable change detection
- Clearer data flow

**Requirements**:
- Use signals for reactive state
- Use OnPush change detection strategy
- Manual change detection when needed (rare with signals)

### OnPush Strategy

Components should use OnPush change detection:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

With signals, OnPush works automatically because Angular knows when signals change.

## Routing

**Current Status**: No routing implemented

The application is a **single-page app (SPA)** without multiple routes. All functionality is on one page.

**Future Consideration**: If routing is needed:
- Use Angular Router with standalone components
- Consider route-level lazy loading
- Use route guards for state management

## Build and Deployment Architecture

### Build Configuration

```
Development Build (npm start)
- Source maps enabled
- No optimization
- Fast rebuild
- Local serving on port 4200

Production Build (npm run build)
- Full optimization and minification
- Tree shaking
- Hash-based file names (cache busting)
- Output to /docs directory
- Base href: /color-pair-quick-iterator/
```

### Deployment Target

**GitHub Pages**:
- Static hosting
- Automatic deployment from /docs directory
- Base URL: https://pawn002.github.io/color-pair-quick-iterator/

See [Deployment Guide](./deployment.md) for details.

## External Dependencies

### Core Dependencies

**Framework**:
- `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router` (^20.3.0)

**Color Science**:
- `colorjs.io` (^0.5.2) - Color space conversions and manipulation
- `apca-w3` (^0.1.9) - APCA contrast algorithm
- `bridge-pca` (^0.1.6) - WCAG 2.x compatibility layer
- `d3` (^7.9.0) - Scaling utilities for contrast-to-size mapping

**Utilities**:
- `lodash-es` (^4.17.21) - Utility functions (minimal usage)
- `rxjs` (^7.8.0) - Reactive programming (minimal usage with signals)

**Fonts**:
- `@fontsource-variable/source-code-pro` (^5.2.7)
- `@fontsource/atkinson-hyperlegible` (^5.2.8)

### Development Dependencies

- `@angular/cli` - Angular command-line tools
- `@storybook/angular` - Component documentation
- `karma`, `jasmine` - Testing framework
- TypeScript, Prettier - Development tooling

## Design Patterns

### 1. Dependency Injection

Using `inject()` function instead of constructor injection:

```typescript
export class ColorContrastComponent {
  private colorMetricsService = inject(ColorMetricsService);
}
```

### 2. Reactive Programming with Signals

Using signals and computed for reactive state:

```typescript
colorOne = input.required<Color>();
colorTwo = input.required<Color>();
contrastScore = computed(() =>
  this.calculateContrast(this.colorOne(), this.colorTwo())
);
```

### 3. Effect for Side Effects

Using `effect()` for reactive side effects:

```typescript
constructor() {
  effect(() => {
    const contrast = this.calculateContrast();
    this.contrastScore.set(contrast);
  });
}
```

### 4. Service Composition

Services delegate to other services:

```typescript
export class ColorMetricsService {
  private colorUtilService = inject(ColorUtilService);
  private bpcaService = inject(BpcaService);

  getContrast(type: 'apca' | 'bpca') {
    return type === 'apca'
      ? this.calcRawApcaContrast()
      : this.bpcaService.calcBPCA();
  }
}
```

## Testing Architecture

**Current Status**: Test infrastructure configured but no tests written

**Strategy**:
- Unit tests for services (business logic)
- Component tests for UI behavior
- Karma + Jasmine test runner
- Chrome browser for test execution

See [Testing Guide](./testing.md) for detailed testing patterns.

## Performance Considerations

### Optimization Strategies

1. **Signals**: Fine-grained reactivity reduces unnecessary updates
2. **OnPush**: Components only check when inputs change
3. **Zoneless**: No Zone.js overhead for change detection
4. **Lazy evaluation**: Computed signals only recalculate when accessed
5. **Tree shaking**: Unused code removed in production builds

### Bundle Size

Production build targets:
- Initial bundle: 500 kB (warning at 500 kB, error at 1 MB)
- Component styles: 4 kB (warning at 4 kB, error at 8 kB)

Current bundle size is well within limits.

## Security Considerations

1. **No user data storage**: Application doesn't store or transmit user data
2. **Client-side only**: All processing happens in the browser
3. **No external API calls**: Completely self-contained
4. **Content Security Policy**: Standard Angular CSP applies
5. **Dependency management**: Regular updates via npm

## Scalability Considerations

### Current Scale

- Single-page application
- Client-side only
- No backend required
- No database

### Future Scaling Options

If the application grows:

1. **Feature modules**: Group related components
2. **Lazy loading**: Load features on demand
3. **State management library**: NgRx or similar for complex state
4. **Backend integration**: Save/load color palettes
5. **PWA**: Offline support with service workers

## Accessibility

The application itself promotes accessibility by helping designers create accessible color pairs.

**Built-in Accessibility Features**:
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Color picker accessibility
- Form controls with proper labels

## Next Steps

- Review [Services Documentation](./services.md) for detailed service APIs
- Read [Components Documentation](./components.md) for component usage
- Check [Contributing Guide](./contributing.md) for development patterns
- See [Testing Guide](./testing.md) for writing tests

## References

- [Angular Documentation](https://angular.dev/)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [OKLCH Color Space](https://oklch.com/)
- [APCA Contrast Algorithm](https://github.com/Myndex/apca-w3)
- [colorjs.io Documentation](https://colorjs.io/)
