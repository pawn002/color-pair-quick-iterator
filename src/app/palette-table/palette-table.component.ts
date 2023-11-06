import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-palette-table',
  templateUrl: './palette-table.component.html',
  styleUrls: ['./palette-table.component.scss'],
})
export class PaletteTableComponent implements OnInit {
  tableHeaders: Array<number> = [];

  // An array of arrays where each array is a 'row' of data, and objects are cells of data.
  dataStruct = [
    [
      {
        color: 'white',
        lightness: 1,
        chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 1,
        chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 1,
        chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
    [
      {
        color: 'grey',
        lightness: 0.5,
        chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: '#2456d3',
        lightness: 0.5,
        chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: '#0137f6',
        lightness: 0.5,
        chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
    [
      {
        color: 'black',
        lightness: 0,
        chroma: 0,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 0,
        chroma: 0.2,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
      {
        color: null,
        lightness: 0,
        chroma: 0.4,
        pContrast: NaN,
        wacg2Comp: NaN,
      },
    ],
  ];

  getTableColumnHeaders() {
    const headers = [];

    const sampleRow = this.dataStruct[0];
    for (let i = 0; i < sampleRow.length; i++) {
      const curCell = sampleRow[i];

      headers.push(curCell.chroma);
    }

    this.tableHeaders = headers;
  }

  ngOnInit(): void {
    this.getTableColumnHeaders();
  }
}
