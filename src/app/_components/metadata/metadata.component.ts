import { Component, effect, inject, input, signal, computed } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../../services/color-util.service';
import { ColorMetricsService } from '../../services/color-metrics.service';

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
  debug = input<boolean>(false);

  private readonly cus = inject(ColorUtilService);
  private readonly cms = inject(ColorMetricsService);

  readonly colorOneMeta = computed<ColorMetaObj | null>(() => {
    const colOne = this.colorOne();
    if (!colOne) {
      if (this.debug()) {
        console.warn('failed to get colorOne meta');
      }
      return null;
    }
    return this.cus.getColorMeta(colOne) ?? null;
  });

  readonly colorTwoMeta = computed<ColorMetaObj | null>(() => {
    const colTwo = this.colorTwo();
    if (!colTwo) {
      if (this.debug()) {
        console.warn('failed to get colorTwo meta');
      }
      return null;
    }
    return this.cus.getColorMeta(colTwo) ?? null;
  });

  readonly differences = computed<DifferencesDataObj>(() => {
    const colOne = this.colorOne();
    const colTwo = this.colorTwo();
    const result = new DifferencesDataObj();
    if (!colOne || !colTwo) {
      if (this.debug()) {
        console.warn('failed to get color differences');
      }
      return result;
    }
    const deltaE = this.cus.calcDeltaE(colOne, colTwo);
    const wcag2New = this.cms.getContrast(colOne, colTwo, 'bpca');
    const wcag2Old = this.cus.calcWcag2(colOne, colTwo);
    const apca = this.cms.getContrast(colOne, colTwo, 'apca');
    result.deltaE = !deltaE ? NaN : deltaE;
    result.wcag2New = !wcag2New ? NaN : wcag2New;
    result.wcag2Old = !wcag2Old ? NaN : wcag2Old;
    result.apca = !apca ? NaN : apca;
    return result;
  });

  readonly successes = computed<SuccessesObj>(() => {
    const colOne = this.colorOne();
    const colTwo = this.colorTwo();
    const result: SuccessesObj = {
      text: null,
      largeText: null,
      objectMinDimension: NaN,
    };
    if (!colOne || !colTwo) {
      if (this.debug()) {
        console.warn('no colors for successes');
      }
      return result;
    }
    const wcagNew = this.cms.getContrast(colOne, colTwo, 'bpca');
    const apcaScore = this.cms.getContrast(colOne, colTwo, 'apca');
    if (!wcagNew || !apcaScore) {
      if (this.debug()) {
        console.warn('trouble getting scores');
      }
      return result;
    }
    if (wcagNew < 0 || Math.abs(apcaScore) < 0) {
      if (this.debug()) {
        console.warn('something wonky with calculating scores');
      }
      return result;
    }
    result.text = wcagNew >= 4.5 ? 'pass' : 'fail';
    result.largeText = wcagNew >= 3 ? 'pass' : 'fail';
    const minDimension = this.cus.getMinObjectDimension(apcaScore);
    result.objectMinDimension = Number.isNaN(minDimension) ? 'invisible' : minDimension;
    return result;
  });
}
