import { Injectable } from '@angular/core';
import Color from 'colorjs.io';
import { to } from 'colorjs.io/fn';
import { ColorConstructor } from 'colorjs.io/types/src/color';
import { random } from 'lodash';

export type ColorPair = [string, string];

export class ChromaMatchObject {
  success: boolean = false;
  colors: ColorPair | null = null;
  chroma: number | null = null;
}

export interface MinMaxLightObject {
  originalCoords: [number, number, number];
  lightMin: number;
  lightMax: number;
}

export type ColorVariant = [number, number, number];

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

  isInSrgbGamut(oklchColorCoord: [number, number, number]): Promise<boolean> {
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

  createVariants(color: string): Array<ColorVariant> | null {
    let variantCollection: Array<ColorVariant> | null = null;

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
        const variant: ColorVariant = [
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
    variants: Array<ColorVariant> | null
  ): Promise<Array<ColorVariant>> {
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

  getRandomColorPair(): ColorPair {
    let pair: ColorPair = ['black', 'white'];

    // ref: oklch.com
    const targetChroma = random(0, 0.4, true);
    // const targetChroma = 0.11;

    const colorOneLight = random(0.25, 0.95, true);
    const colorOneHue = random(0, 360);
    const colorTwoLight = random(0.25, 0.95, true);
    const colorTwoHue = random(0, 360);

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

    pair = [colorOne, colorTwo];

    return pair;
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

      const colorOneCandCoords = [
        colorOneOklch.coords[0],
        colorTwoChroma,
        colorOneOklch.coords[2],
      ] as [number, number, number];
      const colorTwoCandCoords = [
        colorTwoOklch.coords[0],
        colorOneChroma,
        colorTwoOklch.coords[2],
      ] as [number, number, number];

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

  constructor() {}
}
