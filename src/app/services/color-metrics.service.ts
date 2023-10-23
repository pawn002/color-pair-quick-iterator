import { Injectable } from '@angular/core';

import { calcAPCA } from 'apca-w3';

import { scaleLinear } from 'd3';

export interface NumberKeyLookup {
  [key: number]: number;
}

export type ContrastType = 'apca' | 'bpca';
@Injectable({
  providedIn: 'root',
})
export class ColorMetricsService {
  apcaToWcagLookup: NumberKeyLookup = {};

  getContrast(
    colorOne: string,
    colorTwo: string,
    contrastType: ContrastType
  ): number | null {
    let score: number | null = null;

    const contrast = this.calcRawApcaContrast(colorOne, colorTwo);

    if (contrast || contrast === 0) {
      if (contrastType === 'apca') {
        const roundedContrast = contrast.toFixed(0);

        score = parseInt(roundedContrast);
      }

      if (contrastType === 'bpca') {
        const wcagStyleScore = this.transformAPCAToWCAG(contrast);

        score = wcagStyleScore;
      }
    } else {
      console.error(`Raw APCA contrast was not calculable`);
    }

    return score;
  }

  calcRawApcaContrast(colorOne: string, colorTwo: string): number | null {
    let score: number | null = null;

    score = calcAPCA(colorOne, colorTwo);

    return score;
  }

  transformAPCAToWCAG(apcaScore: number): number {
    let wcag: number = NaN;

    // [Source for numbers](https://github.com/Myndex/bridge-pca#additional-notes)
    const scaleApcaToWcag = scaleLinear(
      // WCAG-ish Range
      [1, 3, 4.5, 7, 21]
    ).domain(
      // APCA Absolute Range
      [0, 60, 75, 90, 108]
    );

    const absoluteApca: number = Math.abs(apcaScore);

    if (this.apcaToWcagLookup[absoluteApca]) {
      // use memoized value if present
      wcag = this.apcaToWcagLookup[absoluteApca];
    } else {
      const wcagStyleScore = scaleApcaToWcag(absoluteApca);

      let roundedWcag = parseFloat(wcagStyleScore.toFixed(1));

      if (roundedWcag > 21) {
        roundedWcag = 21;
      }

      // memoize score for later access
      this.apcaToWcagLookup[absoluteApca] = roundedWcag;

      wcag = roundedWcag;
    }

    return wcag;
  }

  constructor() {}
}
