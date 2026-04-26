import { Injectable, inject } from '@angular/core';

import { calcAPCA, sRGBtoY } from 'apca-w3';
import { contrast as okcaContrast } from '@pawn002/okca';

import { scaleLinear } from 'd3';

import { ColorUtilService } from './color-util.service';
import { BpcaService } from './bpca.service';

export interface NumberKeyLookup {
  [key: number]: number;
}

export type ContrastType = 'apca' | 'bpca' | 'deltaE' | 'okca';
@Injectable({
  providedIn: 'root',
})
export class ColorMetricsService {
  cus = inject(ColorUtilService);
  bpca = inject(BpcaService);

  dev: boolean = true;

  apcaToWcagLookup: NumberKeyLookup = {};
  apcaToWcagLookupAlt: NumberKeyLookup = {};

  getContrast(
    colorOne: string,
    colorTwo: string,
    contrastType: ContrastType
  ): number | null {
    let score: number | null = null;

    if (contrastType === 'deltaE') {
      // Handle Delta E separately as it doesn't use APCA
      score = this.cus.calcDeltaE(colorOne, colorTwo);
      return score;
    }

    if (contrastType === 'okca') {
      const hexOne = this.cus.toHexString(colorOne);
      const hexTwo = this.cus.toHexString(colorTwo);
      if (!hexOne || !hexTwo) return null;
      return okcaContrast(hexOne, hexTwo);
    }

    const contrast = this.calcRawApcaContrast(colorOne, colorTwo);

    if (contrast || contrast === 0) {
      if (contrastType === 'apca') {
        const roundedContrast = contrast.toFixed(0);

        score = parseInt(roundedContrast);
      }

      if (contrastType === 'bpca') {
        const bpcaScore = this.calcRawBpcaContrast(colorOne, colorTwo);

        score = bpcaScore;
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

  calcRawBpcaContrast(colorOne: string, colorTwo: string) {
    let wcag: number = NaN;

    const lc = this.bpca.calcBPCA(colorOne, colorTwo) as number;
    const colorOneArray255 = this.cus.getRgb255Array(colorOne);
    const colorTwoArray255 = this.cus.getRgb255Array(colorTwo);

    if (colorOneArray255 && colorTwoArray255) {
      const colorOneY = this.bpca.sRGBtoY(colorOneArray255);
      const colorTwoY = this.bpca.sRGBtoY(colorTwoArray255);

      wcag = parseFloat(this.bpca.bridgeRatio(lc, colorOneY, colorTwoY, ''));
    } else {
      console.warn(`trouble calculating raw BPCA`);
    }

    return wcag;
  }
}
