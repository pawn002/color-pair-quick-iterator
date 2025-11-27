# Services Documentation

This document provides detailed documentation for the three core services that handle business logic in the Color Pair Quick Iterator application.

## Overview

The application follows a service-oriented architecture where business logic is centralized in three singleton services:

1. **ColorUtilService** - Color manipulation and utilities
2. **ColorMetricsService** - Contrast calculation and metrics
3. **BpcaService** - Bridge-PCA algorithm implementation

All services use `providedIn: 'root'` for singleton behavior and the `inject()` function for dependency injection.

---

## ColorUtilService

**Location**: `src/app/services/color-util.service.ts`

The primary service for all color manipulation operations using the colorjs.io library in OKLCH color space.

### Dependencies

- `colorjs.io` - Color parsing, conversion, and manipulation
- `d3` - Scale utilities for contrast-to-size mapping
- `lodash-es` - Utility functions

### Types and Interfaces

```typescript
export type ColorPair = [string, string];
export type ColorCoordArray = [number, number, number];

export class ChromaMatchObject {
  success: boolean = false;
  colors: ColorPair | null = null;
  chroma: number = NaN;
}

export interface MinMaxLightObject {
  originalCoords: ColorCoordArray;
  lightMin: number;
  lightMax: number;
}

export interface ColorMetaObj {
  lightness: number | string;
  chroma: number | string;
  hue: number | string;
  saturation: number | string;
}
```

### Core Methods

#### parseColor(color: string): ColorConstructor | null

Parses a color string into a Color object.

**Parameters**:
- `color` - Color string in any format (hex, rgb, hsl, etc.)

**Returns**: Color object or null if parsing fails

**Example**:
```typescript
const color = colorUtilService.parseColor('#ff5733');
```

---

#### getRgb255Array(color: string): [number, number, number] | null

Converts a color string to RGB values in 0-255 range.

**Parameters**:
- `color` - Color string

**Returns**: Array of [R, G, B] values (0-255) or null

**Example**:
```typescript
const rgb = colorUtilService.getRgb255Array('#ff5733');
// Returns: [255, 87, 51]
```

---

#### createSrgbColor(color: string, lightness: number): string | null

Creates a new sRGB color with the same chroma and hue but different lightness.

**Parameters**:
- `color` - Base color string
- `lightness` - Target lightness (0-1)

**Returns**: Hex color string or null

**Process**:
1. Parse color to OKLCH
2. Extract chroma and hue
3. Create new color with target lightness
4. Map to sRGB gamut (reducing chroma if needed)
5. Return as hex string

**Example**:
```typescript
const lighter = colorUtilService.createSrgbColor('#ff5733', 0.7);
// Returns: '#ff9d8b' (lighter version with same chroma/hue)
```

---

#### getRandomColorPair(): Promise<ColorPair>

Generates a random accessible color pair with matched chromas.

**Returns**: Promise resolving to [foreground, background] color pair

**Process**:
1. Generate random chroma between 0.11-0.34
2. Create dark color (lightness 0.25-0.26)
3. Create light color (lightness 0.94-0.95)
4. Apply chroma matching
5. Return pair

**Example**:
```typescript
const pair = await colorUtilService.getRandomColorPair();
// Returns: ['#2d5a3f', '#f4f7f5']
```

---

#### matchChromas(colorPair: ColorPair): Promise<ChromaMatchObject>

Attempts to match the chroma values between two colors while keeping them in sRGB gamut.

**Parameters**:
- `colorPair` - Array of two color strings [foreground, background]

**Returns**: Promise resolving to ChromaMatchObject with:
- `success` - Whether matching succeeded
- `colors` - Adjusted color pair (or null)
- `chroma` - Matched chroma value

**Logic**:
1. Try giving color one the chroma of color two
2. Try giving color two the chroma of color one
3. If both are possible, choose the higher chroma
4. If only one works, use that one
5. Return the result

**Example**:
```typescript
const result = await colorUtilService.matchChromas(['#ff5733', '#e0e0e0']);
// result.success: true
// result.colors: ['#ff5733', '#dee0dd']
// result.chroma: 0.11
```

---

#### getColorMeta(color: string): ColorMetaObj | null

Extracts detailed color metadata in OKLCH space.

**Parameters**:
- `color` - Color string

**Returns**: Object containing:
- `lightness` - OKLCH lightness (0-1)
- `chroma` - OKLCH chroma (0-~0.4)
- `hue` - OKLCH hue (0-360)
- `saturation` - Calculated saturation percentage

**Example**:
```typescript
const meta = colorUtilService.getColorMeta('#ff5733');
// Returns: {
//   lightness: '0.63',
//   chroma: '0.18',
//   hue: '27.45',
//   saturation: '28.57'
// }
```

---

#### calcDeltaE(colorOne: string, colorTwo: string): number | null

Calculates perceptual color difference using CIE Delta E 2000.

**Parameters**:
- `colorOne` - First color string
- `colorTwo` - Second color string

**Returns**: Delta E value (rounded to integer) or null

**Reference**: Lower values = more similar colors. Values < 1 are imperceptible.

**Example**:
```typescript
const difference = colorUtilService.calcDeltaE('#ff5733', '#ff6744');
// Returns: 3 (small but noticeable difference)
```

---

#### calcWcag2(colorOne: string, colorTwo: string): number | null

Calculates WCAG 2.1 contrast ratio.

**Parameters**:
- `colorOne` - First color string
- `colorTwo` - Second color string

**Returns**: WCAG 2.1 ratio (e.g., 4.5) or null

**Reference**:
- AA text: 4.5:1 minimum
- AA large text: 3:1 minimum
- AAA text: 7:1 minimum

**Example**:
```typescript
const ratio = colorUtilService.calcWcag2('#000000', '#ffffff');
// Returns: 21.0 (maximum contrast)
```

---

#### getMinObjectDimension(apca: number): number

Calculates minimum object size in pixels based on APCA contrast score.

**Parameters**:
- `apca` - APCA contrast score

**Returns**: Minimum dimension in pixels, or NaN if contrast is too low

**Scale**:
- APCA ≥ 100: 0.25px (any size acceptable)
- APCA 90: 1px
- APCA 75: 1.5px
- APCA 60: 2px
- APCA 50: 3px
- APCA 45: 4px
- APCA 30: 6px
- APCA 25: 8px
- APCA 20: 10px
- APCA 15: 15px
- APCA < 15: NaN (insufficient contrast)

**Example**:
```typescript
const minSize = colorUtilService.getMinObjectDimension(60);
// Returns: 2 (2px minimum dimension)
```

---

#### generateAllOklchVariants(color: string, lightSteps: number, chromaSteps: number): Promise<TableData>

Generates a 2D grid of color variants with different lightness and chroma values.

**Parameters**:
- `color` - Base color string
- `lightSteps` - Number of lightness steps
- `chromaSteps` - Number of chroma steps

**Returns**: Promise resolving to TableData (2D array of TableColorCell objects)

**Process**:
1. Parse base color to OKLCH
2. Generate lightness levels (centered on base, ±steps)
3. Generate chroma levels (0 to 0.33, centered on base)
4. Create color variant for each combination
5. Filter to sRGB gamut
6. Calculate delta E and percentage changes
7. Return sorted array (light to dark)

**Example**:
```typescript
const variants = await colorUtilService.generateAllOklchVariants('#ff5733', 5, 14);
// Returns: 6 rows × 15 columns grid of color variants
```

---

### Helper Methods

#### isInSrgbGamut(oklchColorCoord: ColorCoordArray): Promise<boolean>

Checks if an OKLCH color coordinate is within the sRGB gamut.

**Parameters**:
- `oklchColorCoord` - Array of [lightness, chroma, hue]

**Returns**: Promise resolving to boolean

---

#### createVariants(color: string): Array<ColorCoordArray> | null

Creates 1001 lightness variants (0.0 to 1.0 in 0.001 steps) with constant chroma and hue.

**Parameters**:
- `color` - Base color string

**Returns**: Array of OKLCH coordinate arrays or null

---

#### filterOutOfGamutVariants(variants: Array<ColorCoordArray> | null): Promise<Array<ColorCoordArray>>

Filters color variants to include only those within sRGB gamut.

**Parameters**:
- `variants` - Array of OKLCH coordinate arrays

**Returns**: Promise resolving to filtered array

---

#### getMinMaxLight(color: string): Promise<MinMaxLightObject | null>

Calculates the minimum and maximum lightness values that keep the color in sRGB gamut.

**Parameters**:
- `color` - Color string

**Returns**: Promise resolving to object with originalCoords, lightMin, and lightMax

---

#### adjustColorPairForPresentation(pair: ColorPair): Promise<ColorPair>

Adjusts the first color in a pair to use the midpoint of its available lightness range.

**Parameters**:
- `pair` - Color pair [foreground, background]

**Returns**: Promise resolving to adjusted color pair

---

## ColorMetricsService

**Location**: `src/app/services/color-metrics.service.ts`

Calculates contrast scores between two colors using APCA and Bridge-PCA algorithms.

### Dependencies

- `apca-w3` - APCA contrast calculation
- `d3` - Scale utilities
- `ColorUtilService` - Color parsing and conversion
- `BpcaService` - Bridge-PCA calculation

### Types

```typescript
export type ContrastType = 'apca' | 'bpca';

export interface NumberKeyLookup {
  [key: number]: number;
}
```

### Methods

#### getContrast(colorOne: string, colorTwo: string, contrastType: ContrastType): number | null

Main method to get contrast score between two colors.

**Parameters**:
- `colorOne` - Foreground color string
- `colorTwo` - Background color string
- `contrastType` - Type of contrast calculation ('apca' or 'bpca')

**Returns**: Contrast score as number or null

**Example**:
```typescript
const apca = colorMetricsService.getContrast('#000000', '#ffffff', 'apca');
// Returns: 106 (very high contrast)

const bpca = colorMetricsService.getContrast('#000000', '#ffffff', 'bpca');
// Returns: 21.0 (WCAG 2.x ratio)
```

---

#### calcRawApcaContrast(colorOne: string, colorTwo: string): number | null

Calculates raw APCA (Accessible Perceptual Contrast Algorithm) score.

**Parameters**:
- `colorOne` - Foreground color string (text color)
- `colorTwo` - Background color string

**Returns**: Raw APCA score (approximately -108 to +108) or null

**Notes**:
- Positive values: Dark text on light background
- Negative values: Light text on dark background
- Polarity matters! Higher absolute value = better contrast

**Example**:
```typescript
const score = colorMetricsService.calcRawApcaContrast('#000000', '#ffffff');
// Returns: 106.04 (dark on light)

const score2 = colorMetricsService.calcRawApcaContrast('#ffffff', '#000000');
// Returns: -107.86 (light on dark)
```

---

#### calcRawBpcaContrast(colorOne: string, colorTwo: string): number

Calculates Bridge-PCA contrast, which converts APCA scores to WCAG 2.x ratios.

**Parameters**:
- `colorOne` - Foreground color string
- `colorTwo` - Background color string

**Returns**: WCAG 2.x-compatible ratio (e.g., 4.5, 7.0, 21.0)

**Process**:
1. Calculate APCA score
2. Convert to luminance values (Y)
3. Apply Bridge-PCA algorithm to get WCAG 2.x ratio
4. Return as decimal number

**Example**:
```typescript
const ratio = colorMetricsService.calcRawBpcaContrast('#000000', '#ffffff');
// Returns: 21.0 (equivalent to WCAG 2.1 maximum)
```

---

## BpcaService

**Location**: `src/app/services/bpca.service.ts`

Implements the Bridge-PCA algorithm for converting APCA scores to WCAG 2.x-compatible contrast ratios.

### Dependencies

- `ColorUtilService` - Color parsing and RGB conversion

### Notes

This service contains a partial implementation of the bridge-pca algorithm because the original npm package has dependency issues with colorparsely. The code is adapted from the [Bridge-PCA repository](https://github.com/Myndex/bridge-pca/).

### Methods

#### calcBPCA(textColor: string, bgColor: string, places = -1, isInt = true): string | number

Main entry point for Bridge-PCA calculation.

**Parameters**:
- `textColor` - Foreground color string
- `bgColor` - Background color string
- `places` - Decimal places (-1 for float, 0 for rounded with polarity, >0 for fixed decimals)
- `isInt` - Whether to use integer RGB values

**Returns**: BPCA score as string or number

**Example**:
```typescript
const score = bpcaService.calcBPCA('#000000', '#ffffff');
// Returns: 106.04 (as number)
```

---

#### BPCAcontrast(txtY: number, bgY: number, places = -1): string | number

Core Bridge-PCA contrast calculation using luminance values.

**Parameters**:
- `txtY` - Text luminance (0.0-1.0)
- `bgY` - Background luminance (0.0-1.0)
- `places` - Decimal places for output

**Returns**: Contrast score

**Algorithm**:
1. Soft-clamp black values
2. Return 0 for very similar luminances
3. Calculate SAPC (Simple Accessible Perceptual Contrast)
4. Apply different scaling for normal polarity (BoW) vs reverse (WoB)
5. Apply low clip to prevent polarity reversal
6. Return signed numeric value

**Reference**: This is the BPCA 0.1.6 G-4g implementation with 2.4 exponent for monitor perception.

---

#### sRGBtoY(rgba = [0, 0, 0]): number

Converts sRGB color to luminance (Y) value.

**Parameters**:
- `rgba` - RGB array with 0-255 values [R, G, B]

**Returns**: Luminance value (0.0-1.0)

**Process**:
1. Linearize each channel using 2.4 exponent
2. Apply sRGB coefficients (0.2126, 0.7152, 0.0722)
3. Sum to get luminance

**Example**:
```typescript
const luminance = bpcaService.sRGBtoY([255, 255, 255]);
// Returns: 1.0 (white has maximum luminance)
```

---

#### bridgeRatio(contrastLc, txtY: number, bgY: number, ratioStr = ' to 1', places = 1): string

Converts APCA Lc score to WCAG 2.x-style ratio string.

**Parameters**:
- `contrastLc` - APCA Lc score (0-108)
- `txtY` - Text luminance
- `bgY` - Background luminance
- `ratioStr` - Suffix string (default: ' to 1')
- `places` - Decimal places

**Returns**: Ratio string (e.g., '4.5 to 1')

**Algorithm**:
1. Calculate trim adjustment based on max luminance
2. Convert Lc to base WCAG contrast using polynomial formula
3. Adjust ratios under 3:1 with special curve
4. Multiply by 10 to get final ratio
5. Format as string with specified precision

**Example**:
```typescript
const ratio = bpcaService.bridgeRatio(60, 0.0, 1.0, ' to 1', 1);
// Returns: '4.5 to 1'
```

---

#### alphaBlend(rgbaFG, rgbBG, isInt = true): number[]

Alpha-blends a foreground color with transparency over a background color.

**Parameters**:
- `rgbaFG` - Foreground RGBA array [R, G, B, A]
- `rgbBG` - Background RGB array [R, G, B]
- `isInt` - Whether to return integer values

**Returns**: Blended RGB array

**Note**: Currently not used in the main application flow but available for future alpha channel support.

---

## Service Dependencies

```
ColorMetricsService
    ├── ColorUtilService
    └── BpcaService
            └── ColorUtilService

ColorUtilService (standalone)
```

## Usage Patterns

### Pattern 1: Calculate Contrast

```typescript
// In a component
export class ColorContrastComponent {
  private colorMetrics = inject(ColorMetricsService);

  contrastScore = computed(() => {
    return this.colorMetrics.getContrast(
      this.colorOne(),
      this.colorTwo(),
      'apca'
    );
  });
}
```

### Pattern 2: Generate Random Colors

```typescript
// In root component
export class AppComponent {
  private colorUtil = inject(ColorUtilService);

  async ngAfterViewInit() {
    const pair = await this.colorUtil.getRandomColorPair();
    this.colorPickerOneSelectedColor.set(pair[0]);
    this.colorPickerTwoSelectedColor.set(pair[1]);
  }
}
```

### Pattern 3: Match Chromas

```typescript
// In root component
async matchChromas() {
  const pair: ColorPair = [
    this.colorPickerOneSelectedColor(),
    this.colorPickerTwoSelectedColor()
  ];

  const matchedObj = await this.colorUtilService.matchChromas(pair);

  if (matchedObj.success && matchedObj.colors) {
    this.colorPickerOneComparedColor.set(matchedObj.colors[0]);
    this.colorPickerTwoComparedColor.set(matchedObj.colors[1]);
  }
}
```

### Pattern 4: Get Color Metadata

```typescript
// In metadata component
colorOneMeta = computed(() => {
  return this.colorUtilService.getColorMeta(this.colorOne());
});
```

## Testing Services

When writing unit tests for services:

```typescript
describe('ColorUtilService', () => {
  let service: ColorUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorUtilService);
  });

  it('should parse valid hex color', () => {
    const result = service.parseColor('#ff5733');
    expect(result).not.toBeNull();
  });

  it('should return null for invalid color', () => {
    const result = service.parseColor('invalid');
    expect(result).toBeNull();
  });
});
```

See [Testing Guide](./testing.md) for more examples.

## Performance Considerations

1. **Async Operations**: Many methods return Promises due to gamut checking
2. **Caching**: Consider caching frequently calculated values in components
3. **Computed Signals**: Use computed() to automatically cache derived values
4. **Avoid Repeated Parsing**: Parse colors once and reuse the Color objects when possible

## Future Enhancements

Potential improvements for the services:

1. **Memoization**: Cache parsed colors to avoid repeated parsing
2. **Web Workers**: Move heavy calculations (variant generation) to web workers
3. **Batch Operations**: Add methods for batch color processing
4. **Color Palettes**: Methods for generating complementary/analogous color schemes
5. **Export/Import**: Serialization methods for saving color configurations

## References

- [colorjs.io Documentation](https://colorjs.io/)
- [APCA on GitHub](https://github.com/Myndex/apca-w3)
- [Bridge-PCA on GitHub](https://github.com/Myndex/bridge-pca)
- [OKLCH Color Space](https://oklch.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Next Steps

- Review [Components Documentation](./components.md) to see how services are used
- Check [Architecture](./architecture.md) for service integration patterns
- See [Testing Guide](./testing.md) for service testing strategies
