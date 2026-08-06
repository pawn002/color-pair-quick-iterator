import { calcAPCA } from 'apca-w3';
import { contrast as okcaContrast } from '@pawn002/okca';
import { colorUtil } from './color-util.service';
import { BpcaService } from './bpca.service';

export type ContrastType = 'apca' | 'bpca' | 'deltaE' | 'okca';

export class ColorMetricsService {
  private bpca: BpcaService;

  constructor() {
    this.bpca = new BpcaService(colorUtil);
  }

  getContrast(colorOne: string, colorTwo: string, contrastType: ContrastType): number | null {
    if (contrastType === 'deltaE') {
      return colorUtil.calcDeltaE(colorOne, colorTwo);
    }

    if (contrastType === 'okca') {
      const hexOne = colorUtil.toHexString(colorOne);
      const hexTwo = colorUtil.toHexString(colorTwo);
      if (!hexOne || !hexTwo) return null;
      return okcaContrast(hexOne, hexTwo);
    }

    const contrast = this.calcRawApcaContrast(colorOne, colorTwo);

    if (contrast || contrast === 0) {
      if (contrastType === 'apca') {
        return parseInt(contrast.toFixed(0));
      }

      if (contrastType === 'bpca') {
        return this.calcRawBpcaContrast(colorOne, colorTwo);
      }
    } else {
      console.error('Raw APCA contrast was not calculable');
    }

    return null;
  }

  calcRawApcaContrast(colorOne: string, colorTwo: string): number | null {
    return calcAPCA(colorOne, colorTwo);
  }

  calcRawBpcaContrast(colorOne: string, colorTwo: string) {
    let wcag: number = NaN;

    const lc = this.bpca.calcBPCA(colorOne, colorTwo) as number;
    const colorOneArray255 = colorUtil.getRgb255Array(colorOne);
    const colorTwoArray255 = colorUtil.getRgb255Array(colorTwo);

    if (colorOneArray255 && colorTwoArray255) {
      const colorOneY = this.bpca.sRGBtoY(colorOneArray255);
      const colorTwoY = this.bpca.sRGBtoY(colorTwoArray255);
      wcag = parseFloat(this.bpca.bridgeRatio(lc, colorOneY, colorTwoY, ''));
    } else {
      console.warn('trouble calculating raw BPCA');
    }

    return wcag;
  }
}

export const colorMetrics = new ColorMetricsService();
