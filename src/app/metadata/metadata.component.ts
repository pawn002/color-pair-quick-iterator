import { Component, Input, OnChanges } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../services/color-util.service';
import { ColorMetricsService } from '../services/color-metrics.service';

export class DifferencesDataObj {
  deltaE: number | null = null;
  wcag2Old: number | null = null;
  wcag2New: number | null = null;
  apca: number | null = null;
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
})
export class MetadataComponent implements OnChanges {
  @Input() colorOne: string | null = null;
  @Input() colorTwo: string | null = null;

  differences: DifferencesDataObj = {
    deltaE: null,
    wcag2Old: null,
    wcag2New: null,
    apca: NaN,
  };

  successes: SuccessesObj = {
    text: null,
    largeText: null,
    objectMinDimension: NaN,
  };

  colorOneMeta: ColorMetaObj | null = null;

  colorTwoMeta: ColorMetaObj | null = null;

  getColorMeta() {
    if (this.colorOne && this.colorTwo) {
      if (this.cus.getColorMeta(this.colorOne)) {
        this.colorOneMeta = this.cus.getColorMeta(this.colorOne);

        this.colorTwoMeta = this.cus.getColorMeta(this.colorTwo);
      }
    } else {
      console.warn(`failed to get color meta`);
    }
  }

  getColorDifference() {
    if (this.colorOne && this.colorTwo) {
      this.differences.deltaE = this.cus.calcDeltaE(
        this.colorOne,
        this.colorTwo
      );

      this.differences.wcag2New = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        'bpca'
      );

      this.differences.wcag2Old = this.cus.calcWcag2(
        this.colorOne,
        this.colorTwo
      );

      this.differences.apca = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        'apca'
      );
    } else {
      console.warn(`failed to get color differences`);
    }
  }

  getSuccesses() {
    if (this.colorOne && this.colorTwo) {
      const wcagNew = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        'bpca'
      );

      const apcaScore = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        'apca'
      );

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
    }
  }

  constructor(
    private cus: ColorUtilService,
    private cms: ColorMetricsService
  ) {}

  ngOnChanges() {
    this.getColorMeta();

    this.getColorDifference();

    this.getSuccesses();

    // if (this.colorOne && this.colorTwo) {
    //   if (this.differences.apca) {
    //     console.log(this.cus.getMinObjectDimension(this.differences.apca));
    //   }
    // }
  }
}
