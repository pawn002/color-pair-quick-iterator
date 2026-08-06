import Color from 'colorjs.io';
import { ColorConstructor } from 'colorjs.io';
import { scaleLinear } from 'd3';
import { random } from 'lodash-es';

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
  deltaLightness: number;
  deltaChroma: number;
}

export type TableRow = Array<TableColorCell>;
export type TableData = Array<TableRow>;

export class ColorUtilService {
  parseColor(color: string): ColorConstructor | null {
    let parsedColor: ColorConstructor | null = null;
    try {
      parsedColor = Color.parse(color);
    } catch (error) {
      console.error(error);
    }
    return parsedColor;
  }

  toHexString(color: string): string | null {
    const parsed = this.parseColor(color);
    if (!parsed) return null;
    const hex = new Color(parsed).to('srgb').toString({ format: 'hex' });
    return hex.replace(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i, '#$1$1$2$2$3$3');
  }

  hexToOklchString(color: string): string {
    const parsed = this.parseColor(color);
    if (!parsed) throw new Error(`Could not parse color: ${color}`);
    const oklch = Color.to(parsed, 'oklch');
    const [l, c, h] = oklch.coords;
    return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${(h || 0).toFixed(1)})`;
  }

  getRgb255Array(color: string): [number, number, number] | null {
    const colorObj = this.parseColor(color);
    let array255: [number, number, number] | null = null;

    if (colorObj) {
      const colorCoordsDecimal = colorObj.coords;
      array255 = [
        Math.round(colorCoordsDecimal[0] * 255),
        Math.round(colorCoordsDecimal[1] * 255),
        Math.round(colorCoordsDecimal[2] * 255),
      ];
    } else {
      console.error(`unable to parse: ${color}`);
    }

    return array255;
  }

  createSrgbColor(color: string, lightness: number): string | null {
    let srgbColor: string | null = null;
    const parsedColor = this.parseColor(color);

    if (parsedColor) {
      const oklchColor = Color.to(parsedColor, 'oklch');
      const originalChroma = oklchColor.coords[1];
      const originalHue = oklchColor.coords[2];

      const targetColor = new Color('oklch', [lightness, originalChroma, originalHue]);
      const tColorInSrgbGamut = targetColor.toGamut({ space: 'srgb', method: 'oklch.c' });
      const targetColorAsRgbColor = tColorInSrgbGamut.to('srgb');
      srgbColor = targetColorAsRgbColor.toString({ format: 'hex' });
    }

    return srgbColor;
  }

  isInSrgbGamut(oklchColorCoord: ColorCoordArray): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const colorObject = new Color('oklch', oklchColorCoord);
        const variantInGamut = colorObject.inGamut('srgb');
        resolve(variantInGamut);
      } catch (error) {
        reject(error);
      }
    });
  }

  createVariants(color: string): Array<ColorCoordArray> | null {
    let variantCollection: Array<ColorCoordArray> | null = null;
    const parsedColor = this.parseColor(color);

    if (parsedColor) {
      const oklchColor = Color.to(parsedColor, 'oklch');
      const lchCooords = oklchColor.coords;
      const colorChroma = lchCooords[1];
      const colorHue = lchCooords[2];

      const lightnessSteps = 1000;
      const lightMax = 1;
      const lightMin = 0;
      const lightInterval = (lightMax - lightMin) / lightnessSteps;

      variantCollection = [];

      for (let i = 0; i <= lightnessSteps; i++) {
        const variantTargetLight = i * lightInterval;
        const variant: ColorCoordArray = [variantTargetLight, colorChroma, colorHue];
        variantCollection.push(variant);
      }
    } else {
      console.error('unable to parse color');
    }

    return variantCollection;
  }

  filterOutOfGamutVariants(variants: Array<ColorCoordArray> | null): Promise<Array<ColorCoordArray>> {
    return new Promise(async (resolve, reject) => {
      if (!variants) {
        reject('no variants');
      } else {
        let filteringComplete: boolean = false;
        const filtered = [];

        for (let i = 0; i < variants.length; i++) {
          const curVariant = variants[i];
          if (await this.isInSrgbGamut(curVariant)) {
            filtered.push(curVariant);
          }
          if (i === variants.length - 1) filteringComplete = true;
        }

        if (filteringComplete) {
          resolve(filtered);
        } else {
          reject('error');
        }
      }
    });
  }

  async getMinMaxLight(color: string): Promise<MinMaxLightObject | null> {
    let returnedObject: MinMaxLightObject | null = null;

    const initVariantCollection = this.createVariants(color);
    const variantCollection = await this.filterOutOfGamutVariants(initVariantCollection);
    const parsedColor = this.parseColor(color);

    if (parsedColor && variantCollection.length) {
      const oklchColor = Color.to(parsedColor, 'oklch');
      const lchCooords = oklchColor.coords;

      const oklchLightCoordIndex = 0;
      const firstArrayItemIndex = 0;
      const lastArrayItemIndex = variantCollection.length - 1;

      const minLight = variantCollection[firstArrayItemIndex][oklchLightCoordIndex];
      const maxLight = variantCollection[lastArrayItemIndex][oklchLightCoordIndex];

      returnedObject = {
        originalCoords: lchCooords,
        lightMin: minLight,
        lightMax: maxLight,
      };
    } else {
      if (!parsedColor) {
        console.error('unable to parse color');
      } else {
        const oklchColor = Color.to(parsedColor, 'oklch');
        const lchCooords = oklchColor.coords;
        returnedObject = {
          originalCoords: lchCooords,
          lightMin: lchCooords[0],
          lightMax: lchCooords[0],
        };
      }
    }

    return returnedObject;
  }

  async getRandomColorPair(): Promise<ColorPair> {
    let pair: ColorPair = ['black', 'white'];

    const targetChroma = random(0.11, 0.34, true);
    const colorOneLight = random(0.25, 0.26, true);
    const colorOneHue = random(0, 360, true);
    const colorTwoLight = random(0.94, 0.95, true);
    const colorTwoHue = random(0, 360, true);

    const colorOne = new Color('oklch', [colorOneLight, targetChroma, colorOneHue])
      .toGamut({ space: 'srgb', method: 'oklch.c' })
      .to('srgb')
      .toString({ format: 'hex' });

    const colorTwo = new Color('oklch', [colorTwoLight, targetChroma, colorTwoHue])
      .toGamut({ space: 'srgb', method: 'oklch.c' })
      .to('srgb')
      .toString({ format: 'hex' });

    const initPair: ColorPair = [colorOne, colorTwo];
    const chromaMatchedPair = await this.matchChromas(initPair);
    pair = chromaMatchedPair.colors ? chromaMatchedPair.colors : pair;

    return pair;
  }

  async adjustColorPairForPresentation(pair: ColorPair): Promise<ColorPair> {
    let returnedPair: ColorPair = ['black', 'white'];

    const colorOne = pair[0];
    const colortwo = pair[1];

    const parsedColorOne = this.parseColor(colorOne);
    const colorOneMinMaxLightObj = await this.getMinMaxLight(colorOne);

    if (parsedColorOne && colorOneMinMaxLightObj) {
      const colorOneTargetLightness =
        colorOneMinMaxLightObj.lightMin +
        (colorOneMinMaxLightObj.lightMax - colorOneMinMaxLightObj.lightMin) / 2;

      const oklchColorOne = new Color('srgb', parsedColorOne.coords).to('oklch');

      const adjColorOne = new Color('oklch', [
        colorOneTargetLightness,
        oklchColorOne.coords[1],
        oklchColorOne.coords[2],
      ])
        .to('srgb')
        .toString({ format: 'hex' });

      returnedPair = [adjColorOne, colortwo];
    } else {
      console.warn('trouble adjusting colors');
    }

    return returnedPair;
  }

  async matchChromas(colorpair: ColorPair): Promise<ChromaMatchObject> {
    let pair: ChromaMatchObject = new ChromaMatchObject();

    const colorOneParsed = this.parseColor(colorpair[0]);
    const colorTwoParsed = this.parseColor(colorpair[1]);

    if (colorOneParsed && colorTwoParsed) {
      const colorOneOklch = new Color('srgb', colorOneParsed.coords).to('oklch');
      const colorOneChroma = colorOneOklch.coords[1];

      const colorTwoOklch = new Color('srgb', colorTwoParsed.coords).to('oklch');
      const colorTwoChroma = colorTwoOklch.coords[1];

      const colorOneCandCoords: ColorCoordArray = [
        colorOneOklch.coords[0],
        colorTwoChroma,
        colorOneOklch.coords[2],
      ];
      const colorTwoCandCoords: ColorCoordArray = [
        colorTwoOklch.coords[0],
        colorOneChroma,
        colorTwoOklch.coords[2],
      ];

      const colorOneCandInGamut = await this.isInSrgbGamut(colorOneCandCoords);
      const colorTwoCandInGamut = await this.isInSrgbGamut(colorTwoCandCoords);

      if (colorOneCandInGamut && !colorTwoCandInGamut) {
        pair.success = true;
        pair.colors = [
          new Color('oklch', colorOneCandCoords).to('srgb').toString({ format: 'hex' }),
          colorpair[1],
        ];
        pair.chroma = colorOneCandCoords[1];
      }

      if (!colorOneCandInGamut && colorTwoCandInGamut) {
        pair.success = true;
        pair.colors = [
          colorpair[0],
          new Color('oklch', colorTwoCandCoords).to('srgb').toString({ format: 'hex' }),
        ];
        pair.chroma = colorTwoCandCoords[1];
      }

      if (colorOneCandInGamut && colorTwoCandInGamut) {
        if (colorOneCandCoords[1] > colorTwoCandCoords[1]) {
          pair.success = true;
          pair.colors = [
            new Color('oklch', colorOneCandCoords).to('srgb').toString({ format: 'hex' }),
            colorpair[1],
          ];
          pair.chroma = colorTwoCandCoords[1];
        } else {
          pair.success = true;
          pair.colors = [
            colorpair[0],
            new Color('oklch', colorTwoCandCoords).to('srgb').toString({ format: 'hex' }),
          ];
          pair.chroma = colorTwoCandCoords[1];
        }
      }
    } else {
      console.error("color parsing didn't work out.");
    }

    return pair;
  }

  calcDeltaE(colorOne: string, colorTwo: string): number | null {
    let delta: number | null = null;

    const colorOneParsed = this.parseColor(colorOne);
    const colorTwoParsed = this.parseColor(colorTwo);

    if (colorOneParsed && colorTwoParsed) {
      const colorOneObj = new Color('srgb', colorOneParsed.coords);
      const colorTwoObj = new Color('srgb', colorTwoParsed.coords);
      const rawDelta = colorOneObj.deltaE2000(colorTwoObj);
      delta = Math.round(rawDelta);
    }

    return delta;
  }

  calcWcag2(colorOne: string, colorTwo: string): number | null {
    let wcag21: number | null = null;

    const colorOneParsed = this.parseColor(colorOne);
    const colorTwoParsed = this.parseColor(colorTwo);

    if (colorOneParsed && colorTwoParsed) {
      const colorOneObj = new Color('srgb', colorOneParsed.coords);
      const colorTwoObj = new Color('srgb', colorTwoParsed.coords);
      const rawWcag21 = colorOneObj.contrast(colorTwoObj, 'WCAG21');
      wcag21 = parseFloat(rawWcag21.toFixed(1));
    }

    return wcag21;
  }

  getColorMeta(color: string): ColorMetaObj | null {
    let meta: ColorMetaObj | null = null;
    const parsedColor = this.parseColor(color);

    if (parsedColor) {
      const lchColor = Color.to(parsedColor, 'oklch');
      meta = {
        lightness: lchColor.coords[0].toFixed(2),
        chroma: lchColor.coords[1].toFixed(2),
        hue: lchColor.coords[2].toFixed(2),
        saturation: ((lchColor.coords[1] / lchColor.coords[0]) * 100).toFixed(2),
      };
    }

    return meta;
  }

  getMinObjectDimension(apca: number): number {
    let dimension: number = NaN;

    const absApca = Math.abs(apca);
    const pixels = [1, 1.5, 2, 3, 4, 6, 8, 10, 15];
    const apcaScores = [90, 75, 60, 50, 45, 30, 25, 20, 15];
    const minLookup = scaleLinear(pixels).domain(apcaScores);
    const initSize = minLookup(absApca).toFixed(2);

    dimension = parseFloat(initSize);

    if (dimension > 15) dimension = 15;
    if (absApca >= 100) dimension = 0.25;
    if (absApca < 15) dimension = NaN;

    return dimension;
  }

  generateAdaptiveVariants(color: string, minDelta: number = 11): TableData {
    const parsedColor = this.parseColor(color);
    if (!parsedColor) throw new Error(`Could not parse color: ${color}`);

    const oklch = Color.to(parsedColor, 'oklch');
    const baseL = oklch.coords[0];
    const baseC = oklch.coords[1];
    const baseH = oklch.coords[2];

    const L_STEP = 0.005;
    const C_STEP = 0.005;

    const chromaLevels = this.walkAxis(baseL, baseC, baseH, minDelta, C_STEP, 0, 0.4, 'chroma');

    const columns: TableColorCell[][] = [];

    for (const targetC of chromaLevels) {
      const lightnessLevels = this.walkAxis(baseL, targetC, baseH, minDelta, L_STEP, 0, 1, 'lightness');

      const col: TableColorCell[] = [];
      for (const targetL of lightnessLevels) {
        const variant = new Color('oklch', [targetL, targetC, baseH]);
        if (!variant.inGamut('srgb')) continue;

        const hex = variant.to('srgb').toString({ format: 'hex' });
        const deltaE = this.calcDeltaE(hex, color) ?? NaN;
        const dLight = baseL !== 0 ? Math.round(((targetL - baseL) / baseL) * 100) : NaN;
        const dChroma = baseC !== 0 ? Math.round(((targetC - baseC) / baseC) * 100) : NaN;

        col.push({
          color: hex,
          lightness: targetL,
          chroma: targetC,
          hue: baseH,
          deltaE,
          deltaChroma: dChroma,
          deltaLightness: dLight,
        });
      }

      if (col.length > 0) columns.push(col);
    }

    for (const col of columns) {
      col.sort((a, b) => b.lightness - a.lightness);
    }

    const maxHeight = Math.max(...columns.map((c) => c.length));
    const grid: TableData = [];
    for (let r = 0; r < maxHeight; r++) {
      const row: TableColorCell[] = [];
      for (const col of columns) {
        if (r < col.length) row.push(col[r]);
      }
      if (row.length > 0) grid.push(row);
    }

    return grid;
  }

  private walkAxis(
    baseL: number,
    baseC: number,
    baseH: number,
    minDelta: number,
    step: number,
    min: number,
    max: number,
    axis: 'lightness' | 'chroma',
  ): number[] {
    const makeHex = (l: number, c: number): string | null => {
      const col = new Color('oklch', [l, c, baseH]);
      if (!col.inGamut('srgb')) return null;
      return col.to('srgb').toString({ format: 'hex' });
    };

    const getLVal = (pos: number): number => (axis === 'lightness' ? pos : baseL);
    const getCVal = (pos: number): number => (axis === 'chroma' ? pos : baseC);

    const baseVal = axis === 'lightness' ? baseL : baseC;
    const accepted: number[] = [baseVal];

    let prevHex = makeHex(getLVal(baseVal), getCVal(baseVal));
    let pos = baseVal + step;
    while (pos <= max) {
      const hex = makeHex(getLVal(pos), getCVal(pos));
      if (hex && prevHex) {
        const de = this.calcDeltaE(hex, prevHex);
        if (de !== null && de >= minDelta) {
          accepted.push(pos);
          prevHex = hex;
        }
      } else if (hex && !prevHex) {
        prevHex = hex;
      } else if (!hex && prevHex) {
        break;
      }
      pos += step;
    }

    prevHex = makeHex(getLVal(baseVal), getCVal(baseVal));
    pos = baseVal - step;
    while (pos >= min) {
      const hex = makeHex(getLVal(pos), getCVal(pos));
      if (hex && prevHex) {
        const de = this.calcDeltaE(hex, prevHex);
        if (de !== null && de >= minDelta) {
          accepted.unshift(pos);
          prevHex = hex;
        }
      } else if (hex && !prevHex) {
        prevHex = hex;
      } else if (!hex && prevHex) {
        break;
      }
      pos -= step;
    }

    return accepted;
  }
}

export const colorUtil = new ColorUtilService();
