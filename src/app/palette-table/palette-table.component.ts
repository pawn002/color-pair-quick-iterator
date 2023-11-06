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
        color: 'white',
        lightness: 1,
        Chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 1,
        Chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 1,
        Chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
    [
      {
        color: 'grey',
        lightness: 0.5,
        Chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: '#2456d3',
        lightness: 0.5,
        Chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: '#0137f6',
        lightness: 0.5,
        Chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
    [
      {
        color: 'black',
        lightness: 0,
        Chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 0,
        Chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 0,
        Chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
  ];

  // TODO: create function that creates column headers for table based on dynamic data
  getTableColumnHeaders() {}
}
