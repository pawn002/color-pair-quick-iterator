import { Component } from '@angular/core';

@Component({
  selector: 'app-palette-table',
  templateUrl: './palette-table.component.html',
  styleUrls: ['./palette-table.component.scss'],
})
export class PaletteTableComponent {
  // An array of arrays where each array is a 'row' of data, and objects are cells of data.
  dataStruct = [
    [
      {
        color: '',
        lightness: NaN,
        Chroma: NaN,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
  ];
}
