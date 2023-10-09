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

import { interpolate, scaleLinear } from 'd3';

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
    let score: number | null = null;

    const contrast = this.calcApcaContrast(colorOne, colorTwo);

    if (contrastType === 'apca' && contrast) {
      const roundedContrast = contrast.toFixed(0);

      score = parseInt(roundedContrast);
    }

    if (contrastType === 'bpca' && contrast) {
      const wcagStyleScore = this.transformAPCAToWCAG(contrast);

      score = wcagStyleScore;
    }

    return score;
  }

  calcApcaContrast(colorOne: string, colorTwo: string): number | null {
    let score: number | null = null;

    const contrast = calcAPCA(colorOne, colorTwo);

    score = contrast;

    return score;
  }

  transformAPCAToWCAG(apcaScore: number): number {
    let wcag: number = NaN;

    // [Source for numbers](https://github.com/Myndex/bridge-pca#additional-notes)
    const scaleApcaToWcag = scaleLinear([0, 3, 4.5, 7, 21]).domain([
      0, 60, 75, 90, 108,
    ]);

    const absoluteApca: number = Math.abs(
      // Rounding down APCA raw score to ensure no false passes going from APCA to WCAG Style.
      Math.floor(apcaScore)
    );

    const wcagStyleScore = scaleApcaToWcag(absoluteApca);

    const roundedWcag = parseFloat(wcagStyleScore.toFixed(1));

    wcag = roundedWcag;

    return wcag;
  }

  constructor() {}
}
