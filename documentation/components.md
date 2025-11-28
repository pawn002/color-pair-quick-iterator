# Components Documentation

This document provides detailed documentation for all UI components in the Color Pair Quick Iterator application.

## Overview

The application contains 7 standalone components plus the root app component. All components follow Angular 20 patterns with signals, modern control flow (@if, @for), and co-located files.

## Component File Structure

Each component follows this pattern:

```
component-name/
├── component-name.component.ts     # Component logic with signals
├── component-name.html             # Template with native control flow
├── component-name.scss             # Component-scoped styles
└── component-name.stories.ts       # Storybook stories
```

---

## Root Component

### AppComponent

**Location**: `src/app/app.ts`

The root component that orchestrates the entire application, managing global state and coordinating child components.

#### Responsibilities

- Manages primary color pairs (foreground/background, selected/compared)
- Handles contrast type selection (APCA, Bridge-PCA, or APCA object)
- Coordinates UI toggles (constant chroma, show gradient)
- Manages alert notifications
- Handles user interactions (swapping colors, matching chromas, resetting sliders)

#### State Signals

```typescript
// Color selections
colorPickerOneSelectedColor = signal<string>('#2d5a3f');
colorPickerOneComparedColor = signal<string>('#2d5a3f');
colorPickerTwoSelectedColor = signal<string>('#f4f7f5');
colorPickerTwoComparedColor = signal<string>('#f4f7f5');

// UI state
contrastType = signal<'apca' | 'bpca' | 'apca object'>('apca');
constantChroma = signal<boolean>(false);
showGradient = signal<boolean>(true);
currentAlertMessage = signal<AlertMessagObj | null>(null);
resetSlider = signal<boolean>(false);
```

#### Key Methods

**handleColorInputInput(data: { color: string; pickerId: string })**: Updates color signals when user selects colors in color pickers.

**handleSliderInputInput(data: { color: string | null; sliderId: string })**: Updates compared colors when user adjusts sliders.

**swapColors()**: Swaps foreground and background colors.

**matchChromas()**: Calls ColorUtilService to match chroma values between colors.

**setRandomColorPair()**: Generates and sets a random accessible color pair on initialization.

**resetSliders()**: Resets all slider positions by toggling the resetSlider signal.

**radioChange(value: string)**: Updates contrast display type ('apca', 'bpca', or 'apca object').

**toggleConstantChroma()**: Toggles whether sliders maintain constant chroma.

**toggleShowGradient()**: Toggles gradient display in sliders.

#### Usage

The AppComponent is bootstrapped in `main.ts` and serves as the entry point for the application.

---

## UI Components

### 1. ColorPickerComponent

**Location**: `src/app/_components/color-picker/`

HTML color input for selecting colors with two-way data binding.

#### Inputs

```typescript
inputId = input<string>('color-input-one');        // HTML input id
inputName = input<string>('color-input-one');      // HTML input name
color = input<string>('#000000');                  // Initial color value
debug = input<boolean>(false);                     // Debug mode flag
```

#### Model (Two-way Binding)

```typescript
comparedColor = model<string>('#000000');  // Two-way bound compared color
```

#### Outputs

```typescript
selectedColor = output<{ color: string; pickerId: string }>();
```

#### Internal State

```typescript
uiColor = signal<string>('');
uiComparedColor = signal<string>('');
```

#### Behavior

- Displays an HTML color input
- Emits `selectedColor` event when user picks a color
- Supports two-way binding via `comparedColor` model
- Automatically syncs internal state with input signals

#### Example Usage

```html
<app-color-picker
  [inputId]="'picker-one'"
  [inputName]="'foreground-color'"
  [color]="foregroundColor()"
  [(comparedColor)]="comparedForeground"
  (selectedColor)="handleColorChange($event)"
/>
```

---

### 2. ColorSliderComponent

**Location**: `src/app/_components/color-slider/`

Interactive range slider for adjusting color tone (lightness) while optionally maintaining constant chroma.

#### Inputs

```typescript
id = input<string>('color-slider-one');       // Slider HTML id
name = input<string>('color-slider-one');     // Slider HTML name
color = input.required<string>();             // Base color to vary
constantChroma = input<boolean>(false);       // Lock chroma during adjustment
showGradient = input<boolean>(true);          // Display gradient background
resetSlider = input<boolean>(false);          // Signal to reset slider
```

#### Outputs

```typescript
colorVariant = output<{ color: string | null; sliderId: string }>();
```

#### Internal State

```typescript
slideMin = signal<number>(0);
slideMax = signal<number>(100);
slideInterval = signal<number>(1);
value = signal<number>(50);
initValue = signal<number>(50);
devColorVariant = signal<string | null>(null);
```

#### Behavior

- Generates color variants along the lightness axis
- Optionally maintains constant chroma (preserves saturation)
- Displays gradient of available colors as slider background (optional)
- Emits `colorVariant` event as user adjusts slider
- Can reset to initial position via `resetSlider` input
- Uses `effect()` to watch for reset signal
- Uses ColorUtilService to calculate min/max lightness values in gamut

#### Gradient Generation

When `showGradient` is true, the component:
1. Calculates available lightness range for the color
2. Generates intermediate color stops
3. Creates a linear gradient as slider background
4. Updates dynamically when base color changes

#### Example Usage

```html
<app-color-slider
  [id]="'slider-foreground'"
  [name]="'foreground-slider'"
  [color]="foregroundColor()"
  [constantChroma]="lockChroma()"
  [showGradient]="displayGradient()"
  [resetSlider]="shouldReset()"
  (colorVariant)="handleVariantChange($event)"
/>
```

---

### 3. ColorContrastComponent

**Location**: `src/app/_components/color-contrast/`

Displays the contrast score between two colors.

#### Inputs

```typescript
colorOne = input.required<string>();                              // Foreground color
colorTwo = input.required<string>();                              // Background color
contrastType = input<'apca' | 'bpca' | 'apca object'>('apca');  // Type of contrast
debug = input<boolean>(false);                                    // Debug mode
```

#### Internal State

```typescript
contrastScore = signal<string | number | null>(null);
```

#### Behavior

- Uses `effect()` to reactively calculate contrast when inputs change
- Calls ColorMetricsService to get contrast score
- Displays different metrics based on `contrastType`:
  - **'apca'**: Shows APCA score (e.g., "75")
  - **'bpca'**: Shows WCAG 2.x ratio (e.g., "4.5 to 1")
  - **'apca object'**: Shows detailed APCA object

#### Example Usage

```html
<app-color-contrast
  [colorOne]="foreground()"
  [colorTwo]="background()"
  [contrastType]="contrastMode()"
/>
```

#### Contrast Type Modes

The component supports three contrast display modes via `contrastType` input:

1. **'apca'** - Displays APCA Lc score as a number (e.g., "75")
   ```typescript
   [contrastType]="'apca'"
   // Displays: 75
   ```

2. **'bpca'** - Displays WCAG 2.x compatible ratio (e.g., "4.5")
   ```typescript
   [contrastType]="'bpca'"
   // Displays: 4.5
   ```

3. **'apca object'** - Displays minimum object dimension in pixels
   ```typescript
   [contrastType]="'apca object'"
   // Displays: 2 (minimum 2px object size for this contrast)
   ```
   
   This mode uses `ColorUtilService.getMinObjectDimension()` to convert APCA scores to minimum object sizes based on a D3 scale mapping.

#### Contrast Score Interpretation

**APCA Scores** (when `contrastType === 'apca'`):
- 90+: Maximum text readability
- 75+: Body text
- 60+: Large text
- 45+: Large/bold text
- 30+: Non-text UI elements
- 15+: Disabled elements
- <15: Insufficient contrast

**Minimum Object Dimensions** (when `contrastType === 'apca object'`):
- Calculated from APCA score using perceptual scale
- Lower scores = larger minimum size required
- NaN if contrast too low for any size object

---

### 4. MetadataComponent

**Location**: `src/app/_components/metadata/`

Displays detailed color information and differences between two colors.

#### Inputs

```typescript
colorOne = input.required<string>();  // First color
colorTwo = input.required<string>();  // Second color
debug = input<boolean>(false);        // Debug mode
```

#### Computed Signals

```typescript
colorOneMeta = computed(() => this.colorUtilService.getColorMeta(this.colorOne()));
colorTwoMeta = computed(() => this.colorUtilService.getColorMeta(this.colorTwo()));

differences = computed(() => {
  // Returns:
  // - Delta E (perceptual difference)
  // - WCAG 2 contrast ratios (old and new)
  // - APCA contrast score
});

successes = computed(() => {
  // Returns pass/fail for:
  // - Text contrast
  // - Large text contrast
  // - Minimum object dimension
});
```

#### Display Information

**For Each Color**:
- Lightness (OKLCH L)
- Chroma (OKLCH C)
- Hue (OKLCH H)
- Saturation (calculated percentage)

**Differences**:
- Delta E 2000 (perceptual color difference)
- WCAG 2.1 contrast ratio
- APCA contrast score
- Minimum object dimension (pixels)

**Accessibility**:
- Text pass/fail (WCAG AA: 4.5:1)
- Large text pass/fail (WCAG AA: 3:1)
- Object minimum size

#### Example Usage

```html
<app-metadata
  [colorOne]="foreground()"
  [colorTwo]="background()"
/>
```

---

### 5. PaletteTableComponent

**Location**: `src/app/_components/palette-table/`

Displays a grid of color variants with different lightness and chroma values, allowing users to select specific variants.

#### Inputs

```typescript
color = input.required<string>();  // Base color
debug = input<boolean>(false);     // Debug mode
```

#### Outputs

```typescript
selectedColor = output<TableColorCell>();
```

#### Internal State

```typescript
dataStruct = signal<TableData>([]);  // 2D array of color cells
tableHeaders = signal<string[]>([]);  // Column headers
```

#### Types

```typescript
export interface TableColorCell {
  color: string;           // Hex color value
  lightness: number;       // OKLCH lightness
  chroma: number;          // OKLCH chroma
  hue: number;            // OKLCH hue
  deltaE: number;         // Perceptual difference from base
  deltaChroma: number;    // Percentage change in chroma
  deltaLightness: number; // Percentage change in lightness
}

export type TableData = Array<Array<TableColorCell>>;
```

#### Behavior

- Generates a grid (default: 5 lightness × 14 chroma steps)
- Centers the grid on the base color's lightness and chroma
- Only includes colors within sRGB gamut (empty cells for out-of-gamut)
- Calculates Delta E for each variant
- Allows clicking cells to select that color variant
- Updates reactively when base color changes

#### Grid Layout

```
Rows: Lightness levels (light to dark)
Columns: Chroma levels (low to high saturation)
Center: Base color
```

#### Example Usage

```html
<app-palette-table
  [color]="baseColor()"
  (selectedColor)="handlePaletteSelection($event)"
/>
```

---

### 6. AlertComponent

**Location**: `src/app/_components/alert/`

Displays temporary user notifications that auto-dismiss after 5 seconds.

#### Inputs

```typescript
alertMessage = input<AlertMessagObj | null>(null);
```

#### Types

```typescript
export interface AlertMessagObj {
  message: string;
}
```

#### Outputs

```typescript
alertClosed = output<void>();
```

#### Internal State

```typescript
id = signal<string>('');           // Unique alert ID
isVisible = signal<boolean>(true); // Visibility state
```

#### Behavior

- Displays alert message in a dismissible banner
- Auto-hides after 5 seconds using `setTimeout`
- Generates unique IDs using lodash `random` for each alert
- Emits `alertClosed` event when dismissed
- User can manually dismiss by clicking close button

#### Example Usage

```html
<app-alert
  [alertMessage]="currentAlert()"
  (alertClosed)="handleAlertClose()"
/>
```

---

### 7. CopyToClipboardButtonComponent

**Location**: `src/app/_components/copy-to-clipboard-button/`

Button that copies a color's hex value to the clipboard.

#### Inputs

```typescript
color = input.required<string>();  // Color to copy
debug = input<boolean>(false);     // Debug mode
```

#### Outputs

```typescript
copyEvent = output<CopyToClipboardEvent>();
```

#### Types

```typescript
export interface CopyToClipboardEvent {
  copied: boolean;
  color: string;
}
```

#### Behavior

- Uses Clipboard API (`navigator.clipboard.writeText()`)
- Emits success/failure event
- Handles clipboard permission errors gracefully
- Provides visual feedback (button text/state change)

#### Implementation

```typescript
async copyToClipboard() {
  try {
    await navigator.clipboard.writeText(this.color());
    this.copyEvent.emit({ copied: true, color: this.color() });
  } catch (error) {
    console.error('Failed to copy:', error);
    this.copyEvent.emit({ copied: false, color: this.color() });
  }
}
```

#### Example Usage

```html
<app-copy-to-clipboard-button
  [color]="hexColor()"
  (copyEvent)="handleCopy($event)"
/>
```

---

## Component Communication Patterns

### Parent-to-Child (Inputs)

Using the `input()` function:

```typescript
// Parent
<app-color-picker [color]="myColor()" />

// Child
color = input.required<string>();
```

### Child-to-Parent (Outputs)

Using the `output()` function:

```typescript
// Child
selectedColor = output<string>();
this.selectedColor.emit(newColor);

// Parent
<app-color-picker (selectedColor)="handleSelection($event)" />
```

### Two-Way Binding (Model)

Using the `model()` function:

```typescript
// Child
comparedColor = model<string>();

// Parent
<app-color-picker [(comparedColor)]="compared" />
```

### Reactive Updates

Using `computed()` for derived state:

```typescript
export class MetadataComponent {
  colorOne = input.required<string>();
  colorMeta = computed(() => this.service.getColorMeta(this.colorOne()));
}
```

Using `effect()` for side effects:

```typescript
export class ColorSliderComponent {
  resetSlider = input<boolean>();

  constructor() {
    effect(() => {
      if (this.resetSlider()) {
        this.value.set(this.initValue());
      }
    });
  }
}
```

---

## Component Best Practices

### 1. Signal-Based State

Always use signals for component state:

```typescript
// Good
uiColor = signal<string>('#000000');

// Avoid
uiColor: string = '#000000';
```

### 2. Computed for Derived Values

Use `computed()` instead of getters:

```typescript
// Good
contrastScore = computed(() => this.calculate(this.colorOne(), this.colorTwo()));

// Avoid
get contrastScore() {
  return this.calculate(this.colorOne(), this.colorTwo());
}
```

### 3. Effects for Side Effects

Use `effect()` for reactive side effects:

```typescript
constructor() {
  effect(() => {
    // React to signal changes
    console.log('Color changed:', this.color());
  });
}
```

### 4. OnPush Change Detection

All components should use OnPush:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

With signals, OnPush works automatically.

### 5. Native Control Flow

Use `@if`, `@for`, `@switch` instead of structural directives:

```html
<!-- Good -->
@if (isVisible()) {
  <div>Content</div>
}

<!-- Avoid -->
<div *ngIf="isVisible()">Content</div>
```

### 6. Inject Function

Use `inject()` instead of constructor injection:

```typescript
// Good
export class MyComponent {
  private service = inject(MyService);
}

// Avoid
export class MyComponent {
  constructor(private service: MyService) {}
}
```

---

## Testing Components

### Unit Testing Pattern

```typescript
describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorPickerComponent]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected color', () => {
    const emitSpy = jasmine.createSpy('selectedColor');
    component.selectedColor.subscribe(emitSpy);

    component.handleColorChange('#ff5733');

    expect(emitSpy).toHaveBeenCalledWith({
      color: '#ff5733',
      pickerId: component.inputId()
    });
  });
});
```

See [Testing Guide](./testing.md) for more examples.

---

## Storybook Stories

Each component has a corresponding `.stories.ts` file for Storybook documentation.

### Example Story

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { ColorPickerComponent } from './color-picker.component';

const meta: Meta<ColorPickerComponent> = {
  title: 'Components/ColorPicker',
  component: ColorPickerComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Default: Story = {
  args: {
    inputId: 'color-picker-1',
    inputName: 'color-picker-1',
    color: '#ff5733',
    debug: false,
  },
};
```

Run Storybook: `npm run storybook`

---

## Styling

### Component-Scoped Styles

Each component has its own `.scss` file with scoped styles:

```scss
// color-picker.component.scss
:host {
  display: block;
}

.color-input {
  width: 100%;
  height: 40px;
}
```

### Global Styles

Global styles are in `src/styles.scss` and include:
- CSS reset/normalize
- Font imports
- Global CSS custom properties
- Utility classes

---

## Accessibility

Components follow accessibility best practices:

1. **Semantic HTML**: Proper use of form controls, labels, and buttons
2. **ARIA attributes**: Where appropriate (e.g., `aria-label`, `role`)
3. **Keyboard navigation**: All interactive elements are keyboard accessible
4. **Color contrast**: The app itself promotes accessible color contrast
5. **Focus management**: Visible focus indicators

---

## Performance Optimization

### Signals and OnPush

Signals + OnPush change detection provides optimal performance:
- Fine-grained reactivity
- Only update when signals change
- No unnecessary re-renders

### Async Operations

Color calculations can be heavy. Use:
- `computed()` for automatic caching
- Debouncing for rapid user input
- Web Workers for intensive calculations (future enhancement)

---

## Next Steps

- Review [Services Documentation](./services.md) for service APIs
- Check [Contributing Guide](./contributing.md) for component development patterns
- See [Testing Guide](./testing.md) for component testing strategies
- Read [Architecture](./architecture.md) for overall system design

## References

- [Angular Components Guide](https://angular.dev/guide/components)
- [Angular Signals](https://angular.dev/guide/signals)
- [Storybook for Angular](https://storybook.js.org/docs/angular/get-started/introduction)
- [Angular Accessibility](https://angular.dev/guide/accessibility)
