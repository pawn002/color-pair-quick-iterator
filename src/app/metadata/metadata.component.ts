import { Component, effect, inject, input } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../services/color-util.service';
import { ColorMetricsService } from '../services/color-metrics.service';

export class DifferencesDataObj {
  deltaE: number = NaN;
  wcag2Old: number = NaN;
  wcag2New: number = NaN;
  apca: number = NaN;
}
export class SuccessesObj {
  text: 'pass' | 'fail' | null = null;
  largeText: 'pass' | 'fail' | null = null;
  objectMinDimension: number | string = NaN;
}

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss'],
  standalone: true,
})
export class MetadataComponent {
  colorOne = input<string>('');
  colorTwo = input<string>('');

  cus = inject(ColorUtilService);
  cms = inject(ColorMetricsService);

  differences: DifferencesDataObj = new DifferencesDataObj();

  successes: SuccessesObj = {
    text: null,
    largeText: null,
    objectMinDimension: NaN,
  };

  colorOneMeta: ColorMetaObj | null = null;

  colorTwoMeta: ColorMetaObj | null = null;

  constructor() {
    effect(() => {
      const colorOne = this.colorOne();
      const colorTwo = this.colorTwo();

      this.getColorMeta(colorOne, colorTwo);

      this.getColorDifference(colorOne, colorTwo);

      this.getSuccesses(colorOne, colorTwo);
    });
  }

  getColorMeta(colOne: string | null, colTwo: string | null) {
    if (colOne && colTwo) {
      if (this.cus.getColorMeta(colOne)) {
        this.colorOneMeta = this.cus.getColorMeta(colOne);

        this.colorTwoMeta = this.cus.getColorMeta(colTwo);
      }
    } else {
      console.warn(`failed to get color meta`);
    }
  }

  getColorDifference(colOne: string | null, colTwo: string | null) {
    if (colOne && colTwo) {
      const deltaE = this.cus.calcDeltaE(colOne, colTwo);
      const wcag2New = this.cms.getContrast(colOne, colTwo, 'bpca');
      const wcag2Old = this.cus.calcWcag2(colOne, colTwo);
      const apca = this.cms.getContrast(colOne, colTwo, 'apca');

      this.differences.deltaE = !deltaE ? NaN : deltaE;

      this.differences.wcag2New = !wcag2New ? NaN : wcag2New;

      this.differences.wcag2Old = !wcag2Old ? NaN : wcag2Old;

      this.differences.apca = !apca ? NaN : apca;
    } else {
      console.warn(`failed to get color differences`);
    }
  }

  getSuccesses(colOne: string | null, colTwo: string | null) {
    if (colOne && colTwo) {
      const wcagNew = this.cms.getContrast(colOne, colTwo, 'bpca');

      const apcaScore = this.cms.getContrast(colOne, colTwo, 'apca');

      if (wcagNew && apcaScore) {
        if (wcagNew >= 0 && Math.abs(apcaScore) >= 0) {
          this.successes.text = wcagNew >= 4.5 ? 'pass' : 'fail';

          this.successes.largeText = wcagNew >= 3 ? 'pass' : 'fail';

          const minDimension = this.cus.getMinObjectDimension(apcaScore);

          this.successes.objectMinDimension = Number.isNaN(minDimension)
            ? 'invisible'
            : minDimension;
        } else {
          console.warn(`something wonky with calculating scores`);
        }
      } else {
        console.warn(`trouble getting scores`);
      }
    } else {
      console.warn('no colors for successes');
    }
  }
}
