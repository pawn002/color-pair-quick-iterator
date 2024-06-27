import {
  Component,
  Output,
  EventEmitter,
  inject,
  input,
  effect,
} from '@angular/core';
import { ColorUtilService } from '../services/color-util.service';

export class TableColorCell {
  color: string = '';
  lightness: number = NaN;
  chroma: number = NaN;
  hue: number = NaN;
  deltaE: number = NaN;
  deltaLightness: number = NaN;
  deltaChroma: number = NaN;
}

export type TableRow = Array<TableColorCell>;

export type TableData = Array<TableRow>;

@Component({
  selector: 'app-palette-table',
  templateUrl: './palette-table.component.html',
  styleUrls: ['./palette-table.component.scss'],
  standalone: true,
})
export class PaletteTableComponent {
  color = input<string>('');
  debug = input<boolean>(false);

  @Output() selectedColor = new EventEmitter<TableColorCell>();

  cus = inject(ColorUtilService);

  lightSteps = 5;
  chromaSteps = 14;

  tableHeaders: Array<number> = [];

  // An array of arrays where each array is a 'row' of data, and objects are cells of data.
  dataStruct: TableData = [];

  constructor() {
    effect(() => {
      const color = this.color();

      this.getTableData(color);
    });
  }

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

    this.selectedColor.emit(targetColor);
  }

  getTextColor(bkgdColor: string) {
    return (this.cus.calcWcag2('white', bkgdColor) as number) >= 7
      ? 'white'
      : 'black';
  }

  async getTableData(color: string) {
    if (color) {
      this.dataStruct = await this.cus.generateAllOklchVariants(
        color,
        this.lightSteps,
        this.chromaSteps,
      );

      this.getTableColumnHeaders();
    } else {
      if (this.debug()) {
        console.warn(`no color for palette table`);
      }
    }
  }
}
