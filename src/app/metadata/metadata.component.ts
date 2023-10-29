import { Component, Input, OnChanges } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../services/color-util.service';
import { ColorMetricsService } from '../services/color-metrics.service';

export class DifferencesDataObj {
  deltaE: number | null = null;
  wcag2Old: number | null = null;
  wcag2New: number | null = null;
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
      ) as number;
    } else {
      console.warn(`failed to get color differences`);
    }
  }

  getTextPassFail(): string {
    let verdict: string = '';

    if (this.differences.wcag2New) {
      verdict = this.differences.wcag2New >= 4.5 ? 'pass' : 'fail';
    }

    return verdict;
  }

  getLargeTextPassFail(): string {
    let verdict: string = '';

    if (this.differences.wcag2New) {
      verdict = this.differences.wcag2New >= 3 ? 'pass' : 'fail';
    }

    return verdict;
  }

  getObjectMinDimension(): number {
    let size: number = NaN;

    if (this.differences.apca) {
      size = this.cus.getMinObjectDimension(this.differences.apca) as number;
    }

    return size;
  }

  getSuccesses() {
    if (this.differences.wcag2New) {
      this.successes.text = this.differences.wcag2New >= 4.5 ? 'pass' : 'fail';

      this.successes.largeText =
        this.differences.wcag2New >= 3 ? 'pass' : 'fail';

      const minDimension = this.cus.getMinObjectDimension(
        this.differences.apca
      );

      this.successes.objectMinDimension = Number.isNaN(minDimension)
        ? 'invisible'
        : minDimension;
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
