import { Component, Input, OnChanges } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../services/color-util.service';
import { ColorMetricsService } from '../services/color-metrics.service';

export class DifferencesDataObj {
  deltaE: number | null = null;
  wcag2Old: number | null = null;
  wcag2New: number | null = null;
  apca: number | null = null;
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
    apca: null,
  };

  colorOneMeta: ColorMetaObj | null = null;

  colorTwoMeta: ColorMetaObj | null = null;

  constructor(
    private cus: ColorUtilService,
    private cms: ColorMetricsService
  ) {}

  ngOnChanges() {
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

      if (this.cus.getColorMeta(this.colorOne)) {
        this.colorOneMeta = this.cus.getColorMeta(this.colorOne);

        this.colorTwoMeta = this.cus.getColorMeta(this.colorTwo);
      }
    }
  }
}
