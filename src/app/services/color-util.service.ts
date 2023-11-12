import { Injectable } from '@angular/core';
import Color from 'colorjs.io';
import { to } from 'colorjs.io/fn';
import { ColorConstructor } from 'colorjs.io/types/src/color';
import { scaleLinear } from 'd3';
import { random, reverse, uniqBy } from 'lodash';
import {
  TableColorCell,
  TableData,
} from '../palette-table/palette-table.component';

export type ColorPair = [string, string];

export type ColorCoordArray = [number, number, number];

export class ChromaMatchObject {
  success: boolean = false;
  colors: ColorPair | null = null;
  chroma: number | null = null;
}

export interface MinMaxLightObject {
  originalCoords: ColorCoordArray;
  lightMin: number;
  lightMax: number;
}

// export type ColorVariant = [number, number, number];

export interface ColorMetaObj {
  lightness: number | string;
  chroma: number | string;
  hue: number | string;
  saturation: number | string;
}

@Injectable({
  providedIn: 'root',
})
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

  getRgb255Array(color: string) {
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

      const targetColor = new Color('oklch', [
        lightness,
        originalChroma,
        originalHue,
      ]);

      // const inSrgbGamut = targetColor.inGamut('srgb');

      // if (!inSrgbGamut) {
      //   console.warn(
      //     `OKLCH color in SRGB gamut: ${targetColor.inGamut('srgb')}`
      //   );
      // }

      const tColorInSrgbGamut = targetColor.toGamut({
        space: 'srgb',
        method: 'oklch.c',
      });

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

      // 1) create enough steps of lightness
      const lightnessSteps = 1000;
      const lightMax = 1;
      const lightMin = 0;
      const lightInterval = (lightMax - lightMin) / lightnessSteps;

      // 2) create all variants of color using constant chroma and hue.
      variantCollection = [];

      // 2a) this actually creates `lightnessSteps + 1` variants as initial variant has to start at zero.
      for (let i = 0; i <= lightnessSteps; i++) {
        const variantTargetLight = i * lightInterval;
        const variant: ColorCoordArray = [
          variantTargetLight,
          colorChroma,
          colorHue,
        ];

        variantCollection.push(variant);
      }
    } else {
      console.error(`unable to parse color`);
    }

    return variantCollection;
  }

  filterOutOfGamutVariants(
    variants: Array<ColorCoordArray> | null
  ): Promise<Array<ColorCoordArray>> {
    return new Promise(async (resolve, reject) => {
      if (!variants) {
        reject(`no variants`);
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
          reject(`error`);
        }
      }
    });
  }

  async getMinMaxLight(color: string): Promise<MinMaxLightObject | null> {
    let returnedObject: MinMaxLightObject | null = null;

    const initVariantCollection = this.createVariants(color);

    const variantCollection = await this.filterOutOfGamutVariants(
      initVariantCollection
    );

    const parsedColor = this.parseColor(color);

    if (parsedColor && variantCollection.length) {
      const oklchColor = Color.to(parsedColor, 'oklch');

      const lchCooords = oklchColor.coords;

      const oklchLightCoordIndex = 0;
      const firstArrayItemIndex = 0;
      const lastArrayItemIndex = variantCollection.length - 1;

      const minLight =
        variantCollection[firstArrayItemIndex][oklchLightCoordIndex];
      const maxLight =
        variantCollection[lastArrayItemIndex][oklchLightCoordIndex];

      returnedObject = {
        originalCoords: lchCooords,
        lightMin: minLight,
        lightMax: maxLight,
      };
    } else {
      if (!parsedColor) {
        console.error(`unable to parse color`);
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

    // ref: oklch.com
    // const targetChroma = 0.11;
    const targetChroma = random(0.11, 0.34, true);

    const colorOneLight = random(0.25, 0.26, true);
    const colorOneHue = random(0, 360, true);
    const colorTwoLight = random(0.94, 0.95, true);
    const colorTwoHue = random(0, 360, true);

    const colorOne = new Color('oklch', [
      colorOneLight,
      targetChroma,
      colorOneHue,
    ])
      .toGamut({ space: 'srgb', method: 'oklch.c' })
      .to('srgb')
      .toString({ format: 'hex' });

    const colorTwo = new Color('oklch', [
      colorTwoLight,
      targetChroma,
      colorTwoHue,
    ])
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

    const initPair = await this.getRandomColorPair();

    const parsedColorOne = this.parseColor(pair[0]);
    const parsedColorTwo = this.parseColor(pair[1]);

    const colorOneMinMaxLightObj = await this.getMinMaxLight(pair[0]);
    const colorTwoMinMaxLightObj = await this.getMinMaxLight(pair[0]);

    if (
      parsedColorOne &&
      parsedColorTwo &&
      colorOneMinMaxLightObj &&
      colorTwoMinMaxLightObj
    ) {
      const colorOneTargetLightness =
        (colorOneMinMaxLightObj.lightMax - colorOneMinMaxLightObj.lightMin) / 2;
      const colorTwoTargetLightness =
        (colorTwoMinMaxLightObj.lightMax - colorTwoMinMaxLightObj.lightMin) / 2;

      // TODO: continue this algo. . .
      const adjOklchColorOne = new Color('srgb', parsedColorOne.coords);
    } else {
      console.warn('trouble adjusting colors');
    }

    console.log();

    return returnedPair;
  }

  async matchChromas(colorpair: ColorPair): Promise<ChromaMatchObject> {
    let pair: ChromaMatchObject = {
      success: false,
      colors: null,
      chroma: null,
    };

    const colorOneParsed = this.parseColor(colorpair[0]);
    const colorTwoParsed = this.parseColor(colorpair[1]);

    if (colorOneParsed && colorTwoParsed) {
      const colorOneOklch = new Color('srgb', colorOneParsed.coords).to(
        'oklch'
      );
      const colorOneChroma = colorOneOklch.coords[1];

      const colorTwoOklch = new Color('srgb', colorTwoParsed.coords).to(
        'oklch'
      );
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
          new Color('oklch', colorOneCandCoords)
            .to('srgb')
            .toString({ format: 'hex' }),
          colorpair[1],
        ];

        pair.chroma = colorOneCandCoords[1];
      }

      if (!colorOneCandInGamut && colorTwoCandInGamut) {
        pair.success = true;

        pair.colors = [
          colorpair[0],
          new Color('oklch', colorTwoCandCoords)
            .to('srgb')
            .toString({ format: 'hex' }),
        ];

        pair.chroma = colorTwoCandCoords[1];
      }

      if (colorOneCandInGamut && colorTwoCandInGamut) {
        if (colorOneCandCoords[1] > colorTwoCandCoords[1]) {
          pair.success = true;

          pair.colors = [
            new Color('oklch', colorOneCandCoords)
              .to('srgb')
              .toString({ format: 'hex' }),
            colorpair[1],
          ];

          pair.chroma = colorTwoCandCoords[1];
        } else {
          pair.success = true;

          pair.colors = [
            colorpair[0],
            new Color('oklch', colorTwoCandCoords)
              .to('srgb')
              .toString({ format: 'hex' }),
          ];

          pair.chroma = colorTwoCandCoords[1];
        }
      }
    } else {
      console.error("color parsing didn't work out. ");
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

      const fixedDelta = rawDelta.toFixed(2);

      delta = parseFloat(fixedDelta);
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

      const fixedDelta = rawWcag21.toFixed(1);

      wcag21 = parseFloat(fixedDelta);
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
        saturation: ((lchColor.coords[1] / lchColor.coords[0]) * 100).toFixed(
          2
        ),
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

    if (dimension > 15) {
      dimension = 15;
    }

    if (absApca >= 100) {
      dimension = 0.25;
    }

    if (absApca < 15) {
      dimension = NaN;
    }

    return dimension;
  }

  // TODO: pick up here to generate data for table
  generateAllOklchVariants(
    color: string,
    lightSteps: number,
    chromaSteps: number
  ): Promise<TableData> {
    return new Promise((resolve, reject) => {
      const parsedColor = this.parseColor(color);

      const variantsCollection = [];

      let sortedVariantsCollection = [];

      if (parsedColor) {
        const oklchColor = Color.to(parsedColor, 'oklch');
        const lchCooords = oklchColor.coords;
        const colorHue = lchCooords[2];

        const lightMax = 1;
        const lightMin = 0;
        const lightInterval = (lightMax - lightMin) / lightSteps;

        const chromaMax = 0.34;
        const chromaMin = 0;
        const chromaInterval = (chromaMax - chromaMin) / chromaSteps;

        // generate all rows
        for (let i = 0; i <= lightSteps; i++) {
          const variantRow: Array<TableColorCell> = [];

          for (let j = 0; j <= chromaSteps; j++) {
            const targetLightness = parseFloat((i * lightInterval).toFixed(2));
            const targetChroma = parseFloat((j * chromaInterval).toFixed(2));

            const variantColor = new Color('oklch', [
              targetLightness,
              targetChroma,
              colorHue,
            ]);

            const variantColorinGamut = variantColor.inGamut('srgb');

            const variantObj: TableColorCell = {
              color: variantColorinGamut
                ? variantColor.to('srgb').toString({ format: 'hex' })
                : null,
              lightness: targetLightness,
              chroma: targetChroma,
              wacg2Comp: NaN,
              pContrast: NaN,
            };

            variantRow.push(variantObj);
          }

          // variantsCollection.push(
          //   uniqBy(variantRow, (e) => {
          //     return e.color;
          //   })
          // );
          variantsCollection.push(variantRow);
        }
      } else {
        console.error(`could not parse color`);

        reject(`could not parse color`);
      }

      // order color rows from light to dark
      sortedVariantsCollection = reverse(variantsCollection);

      resolve(sortedVariantsCollection);
    });
  }

  constructor() {}
}
