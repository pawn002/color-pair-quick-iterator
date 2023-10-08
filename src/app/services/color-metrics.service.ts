import { Injectable } from '@angular/core';

import {
  APCAcontrast,
  reverseAPCA,
  sRGBtoY,
  displayP3toY,
  adobeRGBtoY,
  alphaBlend,
  calcAPCA,
  fontLookupAPCA,
} from 'apca-w3';

import { colorParsley, colorToHex, colorToRGB } from 'colorparsley'; // optional string parsing

export type ContrastType = 'apca' | 'bpca';
@Injectable({
  providedIn: 'root',
})
export class ColorMetricsService {
  getContrast(
    colorOne: string,
    colorTwo: string,
    contrastType: ContrastType
  ): number | null {
    console.log(colorOne, colorTwo, contrastType);
    let score: number | null = null;

    if (contrastType === 'apca') {
      const contrast = this.calcApcaContrast(colorOne, colorTwo);

      const roundedContrast = contrast?.toFixed(0);

      score = roundedContrast ? parseInt(roundedContrast) : score;
    }

    return score;
  }

  calcApcaContrast(colorOne: string, colorTwo: string): number | null {
    let score: number | null = null;

    const contrast = calcAPCA(colorOne, colorTwo);

    score = contrast;
    return score;
  }

  constructor() {}
}
