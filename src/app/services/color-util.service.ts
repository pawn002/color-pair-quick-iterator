import { Injectable } from '@angular/core';
import Color from 'colorjs.io';
import { ColorConstructor } from 'colorjs.io/types/src/color';
import { random } from 'lodash';

export interface MinMaxLightObject {
  originalCoords: [number, number, number];
  lightMin: number;
  lightMax: number;
}

export type ColorVariant = [number, number, number];

@Injectable({
  providedIn: 'root',
})
export class ColorUtilService {
  parseColor(color: string) {
    let parsedColor: ColorConstructor | null = null;

    try {
      parsedColor = Color.parse(color);
    } catch (error) {
      console.error(error);
    }
    return parsedColor;
  }

  createSrgbColor(color: string, lightness: number): string | null {
    let srgbColor: string | null = null;

    const parsedColor = this.parseColor(color);

    if (parsedColor) {
      const oklchColor = new Color('srgb', parsedColor.coords).to('oklch');
      const originalChroma = oklchColor.coords[1];
      const originalHue = oklchColor.coords[2];

      const targetColor = new Color('oklch', [
        lightness,
        originalChroma,
        originalHue,
      ]);

      const targetColorAsRgbColor = targetColor.to('srgb');

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

  getRandomColorPair(): [string, string] {
    let pair: [string, string] = ['black', 'white'];

    // ref: oklch.com
    const targetChroma = 0.11;

    const colorOneLight = random(0.25, 0.7, true);
    const colorOneHue = random(0, 180);
    const colorTwoLight = random(0.25, 0.7, true);
    const colorTwoHue = random(181, 360);

    const colorOne = new Color('oklch', [
      colorOneLight,
      targetChroma,
      colorOneHue,
    ])
      .to('srgb')
      .toString({ format: 'hex' });

    const colorTwo = new Color('oklch', [
      colorTwoLight,
      targetChroma,
      colorTwoHue,
    ])
      .to('srgb')
      .toString({ format: 'hex' });

    pair = [colorOne, colorTwo];

    return pair;
  }

  constructor() {}
}
