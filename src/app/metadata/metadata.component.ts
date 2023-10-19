import { Component, Input, OnChanges } from '@angular/core';

export class DifferencesDataObj {
  deltaE: number | null = null;
}

export class ColorMetadataObj {
  saturation: number | null = null;
  lightness: number | null = null;
  chroma: number | null = null;
  hue: number | null = null;
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

  colorOneMeta: ColorMetadataObj = {
    saturation: null,
    lightness: null,
    chroma: null,
    hue: null,
  };

  colorOneTwo: ColorMetadataObj = {
    saturation: null,
    lightness: null,
    chroma: null,
    hue: null,
  };

  constructor() {}

  ngOnChanges() {}
}
