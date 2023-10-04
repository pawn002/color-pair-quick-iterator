import { Injectable } from '@angular/core';
import Color from 'colorjs.io';
import { ColorConstructor } from 'colorjs.io/types/src/color';

export class MinMaxLightObject {
  originalCoords: [number, number, number] | null = null;
  lightMin: number | null = null;
  lightMax: number | null = null;
}

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

  // TODO: keep working on this method
  getMinMaxLight(color: string) {
    let returnedObject: MinMaxLightObject | null = null;

    const parsedColor = this.parseColor(color);

    if (parsedColor) {
      returnedObject = {
        originalCoords: null,
        lightMin: null,
        lightMax: null,
      };

      const oklchColor = Color.to(parsedColor, 'oklch');

      const lchCooords = oklchColor.coords;
      const colorChroma = lchCooords[1];
      const colorHue = lchCooords[2];

      // 1) create enough steps of lightness
      const lightnessSteps = 100;
      const lightMax = 1;
      const lightMin = 0;
      const lightInterval = (lightMax - lightMin) / lightnessSteps;

      // 2) create all variants of color using constant chroma and hue.
      type colorVariant = [number, number, number];
      const variantCollection: Array<colorVariant> = [];

      // 2a) this actually creates 101 variants as initial variant has to start at zero.
      for (let i = 0; i <= lightnessSteps; i++) {
        const variantTargetLight = i * lightInterval;
        const variant: colorVariant = [
          variantTargetLight,
          colorChroma,
          colorHue,
        ];

        // 3) validate what is in gamut for srgb
        const colorObject = new Color('oklch', variant);
        const variantInGamut = colorObject.inGamut('srgb');

        if (variantInGamut) {
          variantCollection.push(variant);
        }
      }

      // 4) collect min and max light values for color
      const oklchLightCoordIndex = 0;
      const firstArrayItemIndex = 0;
      const lastArrayItemIndex = variantCollection.length - 1;
      const minLight =
        variantCollection[firstArrayItemIndex][oklchLightCoordIndex];
      const maxLight =
        variantCollection[lastArrayItemIndex][oklchLightCoordIndex];

      returnedObject.originalCoords = lchCooords;
      returnedObject.lightMin = minLight;
      returnedObject.lightMax = maxLight;
    } else {
      console.error(`unable to parse color`);
    }

    console.log(returnedObject);

    return returnedObject;
  }

  constructor() {}
}
