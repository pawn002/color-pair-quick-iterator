# Services

The three classes that carry the business logic in Color Pair Quick Iterator (CPQI).

## Overview

1. **ColorUtilService** — color parsing, conversion, gamut work, variant generation
2. **ColorMetricsService** — contrast scores across four algorithms
3. **BpcaService** — the Bridge-PCA implementation

Each is a plain class in `src/app/services/`, exported as a **module-level singleton**:

```ts
export class ColorUtilService { /* … */ }
export const colorUtil = new ColorUtilService();
```

There is no DI container, no `providedIn: 'root'`, and no `inject()`. Consumers import
the instance:

```ts
import { colorUtil } from '../services/color-util.service';
import { colorMetrics } from '../services/color-metrics.service';
```

Specs construct their own where isolation matters (`new ColorUtilService()`), or spy on
the shared instance with `vi.spyOn`.

---

## ColorUtilService

**Location**: `src/app/services/color-util.service.ts`
**Singleton**: `colorUtil`

Color manipulation via colorjs.io, working in OKLCH.

### Dependencies

- `colorjs.io` — parsing, conversion, gamut mapping, Delta E
- `d3` — scale utilities for contrast-to-size mapping

### Types

```ts
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

export interface TableColorCell {
  color: string;
  lightness: number;
  chroma: number;
  hue: number;
  deltaE: number;
  deltaChroma: number;
  deltaLightness: number;
}

export type TableRow = Array<TableColorCell>;
export type TableData = Array<TableRow>;
```

### Parsing and conversion

#### `parseColor(color: string): ColorConstructor | null`

Parses any CSS color string into a colorjs.io color. Returns `null` — and logs — if the
string cannot be parsed. Every other method here goes through it.

```ts
colorUtil.parseColor('#ff5733');          // Color
colorUtil.parseColor('rgb(255, 87, 51)'); // Color
colorUtil.parseColor('red');              // Color
colorUtil.parseColor('not-a-color');      // null
```

---

#### `toHexString(color: string): string | null`

Converts to a hex string in sRGB, expanding three-digit shorthand to six so downstream
comparisons are consistent.

```ts
colorUtil.toHexString('rgb(255, 87, 51)'); // '#ff5733'
colorUtil.toHexString('#fff');             // '#ffffff'
```

---

#### `hexToOklchString(color: string): string`

Formats a color as an `oklch(...)` string at fixed precision — 2 decimals for lightness,
3 for chroma, 1 for hue.

**Throws** on an unparseable color, unlike its neighbours. It is used where the input is
already known-good, principally to talk to `candor-tone-picker`.

```ts
colorUtil.hexToOklchString('#ff5733'); // 'oklch(0.68 0.210 33.7)'
```

---

#### `getRgb255Array(color: string): [number, number, number] | null`

RGB channels in the 0–255 range, for the APCA and Bridge-PCA implementations, which want
integers.

```ts
colorUtil.getRgb255Array('#ff5733'); // [255, 87, 51]
colorUtil.getRgb255Array('invalid'); // null
```

---

#### `createSrgbColor(color: string, lightness: number): string | null`

A new color with the same chroma and hue at a different lightness, gamut-mapped to sRGB.

1. Parse to OKLCH
2. Keep chroma and hue, substitute the target lightness
3. Gamut-map to sRGB, which reduces chroma as needed
4. Return hex

```ts
colorUtil.createSrgbColor('#ff5733', 0.7); // a lighter variant, same hue family
```

This is what the lightness sliders call on every movement.

---

### Gamut work

#### `isInSrgbGamut(oklchColorCoord: ColorCoordArray): Promise<boolean>`

Whether an `[L, C, H]` coordinate is displayable in sRGB.

---

#### `createVariants(color: string): Array<ColorCoordArray> | null`

1001 lightness variants from 0.0 to 1.0 in 0.001 steps, holding chroma and hue constant.

---

#### `filterOutOfGamutVariants(variants): Promise<Array<ColorCoordArray>>`

Keeps only the in-gamut coordinates from a variant list.

---

#### `getMinMaxLight(color: string): Promise<MinMaxLightObject | null>`

The lightness range over which a color stays inside sRGB, given its chroma and hue.

```ts
const range = await colorUtil.getMinMaxLight('#ff5733');
// { originalCoords: [0.68, 0.21, 33.69], lightMin: 0.58, lightMax: 0.68 }
```

This is why `cc-color-slider` cannot render its input on the first pass — the slider's
bounds are not known synchronously.

---

### Pair generation and matching

#### `getRandomColorPair(): Promise<ColorPair>`

A random pair that already passes, with matched chromas.

1. Pick a random chroma between 0.11 and 0.34
2. Build a dark color (lightness 0.25–0.26)
3. Build a light color (lightness 0.94–0.95)
4. Match chromas
5. Return `[foreground, background]`

```ts
const pair = await colorUtil.getRandomColorPair(); // ['#2d5a3f', '#f4f7f5']
```

Called on first load when the URL carries no color state.

---

#### `matchChromas(colorPair: ColorPair): Promise<ChromaMatchObject>`

Gives both colors the same chroma, if sRGB allows it.

1. Try giving color one the chroma of color two
2. Try giving color two the chroma of color one
3. If both work, take the higher chroma
4. If only one works, take that
5. Otherwise report failure

```ts
const result = await colorUtil.matchChromas(['#ff5733', '#e0e0e0']);
// { success: true, colors: ['#ff5733', '#dee0dd'], chroma: 0.11 }
```

---

#### `adjustColorPairForPresentation(pair: ColorPair): Promise<ColorPair>`

Moves the first color to the midpoint of its available lightness range, so a generated
pair starts somewhere with room to move in both directions.

---

### Measurement

#### `calcDeltaE(colorOne: string, colorTwo: string): number | null`

CIE Delta E 2000 perceptual difference, rounded to an integer. Lower is more similar;
below 1 is imperceptible.

```ts
colorUtil.calcDeltaE('#ff5733', '#ff6744'); // 3
colorUtil.calcDeltaE('#ff5733', '#ff5733'); // 0
```

---

#### `calcWcag2(colorOne: string, colorTwo: string): number | null`

The WCAG 2.1 contrast ratio. Shown in `cc-metadata` for comparison — it is not one of the
selectable contrast modes.

```ts
colorUtil.calcWcag2('#000000', '#ffffff'); // 21
```

AA text is 4.5:1, AA large text 3:1, AAA text 7:1.

---

#### `getMinObjectDimension(apca: number): number`

Minimum object size in pixels for a given APCA score, via a d3 scale.

| APCA | Minimum dimension |
|---|---|
| ≥ 100 | 0.25px |
| 90 | 1px |
| 75 | 1.5px |
| 60 | 2px |
| 50 | 3px |
| 45 | 4px |
| 30 | 6px |
| 25 | 8px |
| 20 | 10px |
| 15 | 15px |
| < 15 | `NaN` — insufficient for any object |

```ts
colorUtil.getMinObjectDimension(60); // 2
colorUtil.getMinObjectDimension(10); // NaN
```

`NaN` is the meaningful answer here, not an error — it is what `cc-color-contrast`
announces as "Contrast too low for any object".

---

#### `getColorMeta(color: string): ColorMetaObj | null`

OKLCH values plus a calculated saturation percentage, formatted for display.

```ts
colorUtil.getColorMeta('#ff5733');
// { lightness: '0.68', chroma: '0.21', hue: '33.69', saturation: '30.87' }
```

---

### Variant generation

#### `generateAdaptiveVariants(color: string, minDelta = 11): TableData`

The variant grid behind `cc-palette-table`. Walks outward from the base color along the
chroma axis and then, for each chroma level, along the lightness axis — stepping until
each successive variant is at least `minDelta` Delta E from the last, and dropping
anything outside sRGB.

**Adaptive, not fixed-step**: the spacing is perceptual rather than numeric, so the grid
carries roughly even visual separation instead of clustering where the color space is
dense.

**Throws** if the color cannot be parsed.

```ts
const variants = colorUtil.generateAdaptiveVariants('#ff5733');
// TableData — columns of TableColorCell, each with deltaE from the base
```

> This replaced `generateAllOklchVariants(color, lightSteps, chromaSteps)`, which took
> fixed step counts. If you find that name, it predates the current implementation.

---

## ColorMetricsService

**Location**: `src/app/services/color-metrics.service.ts`
**Singleton**: `colorMetrics`

Contrast scores. **OKCA is the primary and default algorithm.**

### Dependencies

- `@pawn002/okca` — OKCA (primary)
- `apca-w3` — APCA
- `colorUtil` — parsing and conversion
- `BpcaService` — constructed internally with `colorUtil`

### Types

```ts
export type ContrastType = 'apca' | 'bpca' | 'deltaE' | 'okca';
```

`<cc-app>` and `<cc-color-contrast>` widen this to `ContrastType | 'apca object'` — the
object mode is a presentation of an APCA score via
`ColorUtilService.getMinObjectDimension()`, not a fifth algorithm here.

### Methods

#### `getContrast(colorOne, colorTwo, contrastType): number | null`

The single entry point. `colorOne` is the foreground, `colorTwo` the background.

| Type | Scale | Notes |
|---|---|---|
| `okca` | 1–21 (20.9 ceiling) | OKLCH-native, polarity-aware, zero WCAG false passes — the default |
| `apca` | ~0–108 | Perceptual, signed; returned rounded to an integer |
| `bpca` | 1–21 | WCAG 2.x ratio via Bridge-PCA |
| `deltaE` | 0–100 | CIE Delta E 2000 — a difference measure, not a contrast one |

Dispatch order matters: `deltaE` and `okca` are handled first and return directly. Both
`apca` and `bpca` go through a raw APCA calculation, so if that fails, both return
`null`.

For `okca`, both colors are normalised through `toHexString()` first; if either fails to
parse, the result is `null` rather than a wrong number.

```ts
colorMetrics.getContrast('#ff69b4', '#1a1a1a', 'okca'); // 3.6 — WCAG gives 6.6
colorMetrics.getContrast('#000000', '#ffffff', 'apca'); // 106
colorMetrics.getContrast('#000000', '#ffffff', 'bpca'); // 21
```

---

#### `calcRawApcaContrast(colorOne, colorTwo): number | null`

The unrounded APCA score, straight from `apca-w3`.

- **Positive** — dark text on a light background
- **Negative** — light text on a dark background

Polarity is meaningful; magnitude is the contrast.

```ts
colorMetrics.calcRawApcaContrast('#000000', '#ffffff'); //  106.04
colorMetrics.calcRawApcaContrast('#ffffff', '#000000'); // -107.86
```

---

#### `calcRawBpcaContrast(colorOne, colorTwo): number`

The WCAG 2.x-compatible ratio.

1. `BpcaService.calcBPCA()` for the Lc score
2. Both colors to 0–255 RGB, then to luminance via `sRGBtoY()`
3. `bridgeRatio()` to convert Lc plus luminances into a ratio
4. `parseFloat` the result

Returns `NaN` — and warns — if either color fails to convert.

```ts
colorMetrics.calcRawBpcaContrast('#000000', '#ffffff'); // 21
```

---

### About OKCA

OKCA outputs on the familiar 1–21 scale with the same AA (4.5) and AAA (7.0) thresholds
as WCAG, while correcting a known WCAG failure mode.

**Saturated chromatic false passes** — hot pink on near-black scores 6.6:1 under WCAG but
is demonstrably harder to read. OKCA applies a chroma penalty that reduces the ratio for
vivid colors; that pair scores 3.6.

It is also **polarity-aware**: light-on-dark and dark-on-light pairs score differently,
capped at 20.9 and 20 respectively. The light-on-dark ceiling sits just below WCAG's 21
so that every OKCA score is *strictly* under the WCAG equivalent.

OKCA never approves a pair that WCAG rejects (FP = 0, proven for sRGB), which makes it a
strictly stricter drop-in alternative.

---

## BpcaService

**Location**: `src/app/services/bpca.service.ts`

Bridge-PCA: converting APCA scores into WCAG 2.x-compatible ratios.

### Construction

Unlike the other two, this one takes a dependency and is **not** exported as a singleton.
`ColorMetricsService` constructs it:

```ts
constructor() {
  this.bpca = new BpcaService(colorUtil);
}
```

### Why it is reimplemented here

The published `bridge-pca` package has dependency problems with colorparsely, so the
algorithm is partially reimplemented from the
[Bridge-PCA repository](https://github.com/Myndex/bridge-pca/). This is BPCA 0.1.6 G-4g,
with the 2.4 exponent for monitor perception.

### Methods

#### `calcBPCA(textColor: string, bgColor: string, places = -1): string | number`

Entry point. Converts both colors to 0–255 RGB, then to luminance, then runs
`BPCAcontrast`.

`places`: `-1` for a float, `0` for rounded with polarity preserved, greater than 0 for
fixed decimals.

```ts
bpca.calcBPCA('#000000', '#ffffff'); // 106.04
```

---

#### `BPCAcontrast(txtY: number, bgY: number, places = -1): string | number`

The core calculation, from luminance values.

1. Soft-clamp black values
2. Return 0 for luminances too close to distinguish
3. Compute SAPC (Simple Accessible Perceptual Contrast)
4. Scale differently for normal polarity (black-on-white) than reverse (white-on-black)
5. Apply a low clip, so the result cannot cross zero and flip polarity
6. Return a signed value

---

#### `sRGBtoY(rgba = [0, 0, 0]): number`

sRGB to luminance.

1. Linearise each channel with the 2.4 exponent
2. Apply the sRGB coefficients (0.2126, 0.7152, 0.0722)
3. Sum

```ts
bpca.sRGBtoY([255, 255, 255]); // 1.0
bpca.sRGBtoY([0, 0, 0]);       // 0.0
```

---

#### `bridgeRatio(contrastLc, txtY, bgY, ratioStr = ' to 1', places = 1): string`

APCA Lc into a WCAG 2.x-style ratio **string**.

1. Compute a trim adjustment from the higher luminance
2. Convert Lc to a base WCAG contrast with a polynomial fit
3. Apply a separate curve below 3:1
4. Scale by 10
5. Format to `places` decimals with `ratioStr` appended

```ts
bpca.bridgeRatio(60, 0.0, 1.0, ' to 1', 1); // '4.5 to 1'
bpca.bridgeRatio(60, 0.0, 1.0, '');         // '4.5'
```

`ColorMetricsService` passes `''` and calls `parseFloat` on the result, which is why the
suffix is a parameter.

---

#### `alphaBlend(rgbaFG, rgbBG, isInt = true): number[]`

Blends a translucent foreground over an opaque background. Not used in the current flow;
retained for future alpha support.

---

## Dependency graph

```
ColorMetricsService  ──uses──▶  colorUtil (ColorUtilService)
        │
        └──constructs──▶  BpcaService  ──uses──▶  colorUtil

ColorUtilService  ──▶  colorjs.io, d3   (no internal dependencies)
```

`colorUtil` and `colorMetrics` are exported instances. `BpcaService` is not — it is
constructed with its dependency.

---

## Usage patterns

### Calculating contrast in a component

```ts
import { colorMetrics } from '../../services/color-metrics.service';

private _computeScore() {
  const score = colorMetrics.getContrast(this.colorOne, this.colorTwo, this.contrastType);
  this.contrastScore = score ?? NaN;
}
```

### Generating a starting pair

```ts
import { colorUtil } from '../services/color-util.service';

private async _setRandomColorPair() {
  const [fg, bg] = await colorUtil.getRandomColorPair();
  this.fgColor = fg;
  this.bgColor = bg;
}
```

### Matching chromas

```ts
private async _matchChromas() {
  const matched = await colorUtil.matchChromas([this.fgColor, this.bgColor]);

  if (matched.success && matched.colors) {
    this.fgComparedColor = matched.colors[0];
    this.bgComparedColor = matched.colors[1];
  }
}
```

### Reading metadata

```ts
get colorOneMeta() {
  return colorUtil.getColorMeta(this.colorOne);
}
```

A getter, not a cached computation — it re-evaluates on each render, which is what you
want.

---

## Error handling conventions

- **Return `null` for a failure a caller can reasonably handle** — an unparseable color,
  a conversion that cannot proceed. Most methods here do this, and log
- **Return `NaN` where it is a meaningful value** — `getMinObjectDimension` below the
  threshold, `calcRawBpcaContrast` when conversion fails
- **Throw only where the input is already known-good** — `hexToOklchString` and
  `generateAdaptiveVariants` throw, because reaching them with an unparseable color is a
  programming error, not user input

When testing an error path, prefer `vi.spyOn(...).mockReturnValue(null)` over feeding a
value that makes the code genuinely throw. A spec that drives a real error prints a stack
trace on every run and trains you to ignore stderr.

---

## Testing

Services are plain classes — instantiate directly, no `TestBed`:

```ts
import { describe, it, expect, vi } from 'vitest';
import { ColorUtilService, colorUtil } from './color-util.service';

describe('ColorUtilService', () => {
  const service = new ColorUtilService();

  it('parses a valid hex color', () => {
    expect(service.parseColor('#ff5733')).not.toBeNull();
  });

  it('returns null for an unparseable string', () => {
    expect(service.parseColor('not-a-color')).toBeNull();
  });
});

// Mocking a collaborator on the shared singleton
it('returns null when conversion fails', () => {
  vi.spyOn(colorUtil, 'getRgb255Array').mockReturnValue(null);
  expect(colorMetrics.calcRawApcaContrast('#000000', '#ffffff')).toBeNull();
});
```

The service specs are the largest part of the suite — 78 tests for `ColorUtilService`, 48
for `BpcaService`, 44 for `ColorMetricsService`. See the [Testing Guide](./testing.md).

---

## Performance notes

1. **Several methods are async** because sRGB gamut checks are — `isInSrgbGamut`,
   `getMinMaxLight`, `matchChromas`, `getRandomColorPair`,
   `adjustColorPairForPresentation`
2. **`generateAdaptiveVariants` is the expensive synchronous call.** It walks two axes
   with a Delta E computation per step; it is called on a color change, not per render
3. **Parse once, reuse.** `parseColor` is not memoised, so a method that needs a color
   several times should hold the parsed object

---

## References

- [OKCA](https://github.com/pawn002/okca) — the primary contrast algorithm
- [colorjs.io](https://colorjs.io/)
- [APCA](https://github.com/Myndex/apca-w3)
- [Bridge-PCA](https://github.com/Myndex/bridge-pca)
- [OKLCH color space](https://oklch.com/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

## Next steps

- [Components](./components.md) — how these APIs are consumed
- [Architecture](./architecture.md) — where services sit in the whole
- [Testing](./testing.md) — patterns for exercising them
