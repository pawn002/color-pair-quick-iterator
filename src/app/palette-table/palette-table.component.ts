import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColorUtilService } from '../services/color-util.service';

export class TableColorCell {
  color: string | null = null;
  lightness: number = NaN;
  chroma: number = NaN;
  hue: number = NaN;
  deltaE: number | null = null;
  deltaLightness: number | null = null;
  deltaChroma: number | null = null;

  // pContrast: number = NaN;
  // wacg2Comp: number = NaN;
}

export type TableRow = Array<TableColorCell>;

export type TableData = Array<TableRow>;

@Component({
  selector: 'app-palette-table',
  templateUrl: './palette-table.component.html',
  styleUrls: ['./palette-table.component.scss'],
})
export class PaletteTableComponent implements OnInit, OnChanges {
  @Input() color: string | null = null;

  @Output() selectedColor = new EventEmitter<TableColorCell>();

  // chromaSteps = 70;
  // lightSteps = 50;
  chromaSteps = 4;
  lightSteps = 4;

  tableHeaders: Array<number> = [];

  // An array of arrays where each array is a 'row' of data, and objects are cells of data.
  dataStruct: TableData = [];

  getTableColumnHeaders() {
    const headers = [];

    const sampleRow = this.dataStruct[0];

    for (let i = 0; i < sampleRow.length; i++) {
      const curCell = sampleRow[i];

      headers.push(curCell.chroma);
    }

    this.tableHeaders = headers;
  }

  selectColor(rowNum: number, columnNum: number) {
    const targetColor = this.dataStruct[rowNum][columnNum];

    console.log(rowNum, columnNum);
    console.log(targetColor.color);

    this.selectedColor.emit(targetColor);
  }

  getTextColor(bkgdColor: string) {
    return (this.cus.calcWcag2('white', bkgdColor) as number) >= 7
      ? 'white'
      : 'black';
  }

  async getTableData() {
    if (this.color) {
      this.dataStruct = await this.cus.generateAllOklchVariants(
        this.color,
        this.lightSteps,
        this.chromaSteps
      );

      this.getTableColumnHeaders();
    } else {
      console.error(`no color for palette table`);
    }
  }

  constructor(private cus: ColorUtilService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`-----OnChanges`);

    this.getTableData();
  }

  ngOnInit(): void {
    console.log(`-----OnInit`);
    // this.getTableData();
  }
}
