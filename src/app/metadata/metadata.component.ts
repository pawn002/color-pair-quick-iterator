import { Component, Input, OnChanges } from '@angular/core';
import { ColorUtilService, ColorMetaObj } from '../services/color-util.service';

export class DifferencesDataObj {
  deltaE: number | null = null;
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
  };

  colorOneMeta: ColorMetaObj | null = null;

  colorTwoMeta: ColorMetaObj | null = null;

  constructor(private cus: ColorUtilService) {}

  ngOnChanges() {
    if (this.colorOne && this.colorTwo) {
      this.differences.deltaE = this.cus.calcDeltaE(
        this.colorOne,
        this.colorTwo
      );

      if (this.cus.getColorMeta(this.colorOne)) {
        this.colorOneMeta = this.cus.getColorMeta(this.colorOne);

        this.colorTwoMeta = this.cus.getColorMeta(this.colorTwo);
      }
    }
  }
}
