import { Injectable } from '@angular/core';

import { calcAPCA, sRGBtoY } from 'apca-w3';

import { scaleLinear } from 'd3';

import { ColorUtilService } from './color-util.service';
import { BpcaService } from './bpca.service';

export interface NumberKeyLookup {
  [key: number]: number;
}

export type ContrastType = 'apca' | 'bpca';
@Injectable({
  providedIn: 'root',
})
export class ColorMetricsService {
  dev: boolean = true;

  apcaToWcagLookup: NumberKeyLookup = {};
  apcaToWcagLookupAlt: NumberKeyLookup = {};

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
    const lc = this.bpca.calcBPCA(colorOne, colorTwo) as number;
    const colorOneArray255 = this.cus.getRgb255Array(colorOne) as number[];
    const colorTwoArray255 = this.cus.getRgb255Array(colorTwo) as number[];
    const colorOneY = this.bpca.sRGBtoY(colorOneArray255);
    const colorTwoY = this.bpca.sRGBtoY(colorTwoArray255);
    const wcag = parseFloat(
      this.bpca.bridgeRatio(lc, colorOneY, colorTwoY, '')
    );

    return wcag;
  }

  constructor(private cus: ColorUtilService, private bpca: BpcaService) {}
}
