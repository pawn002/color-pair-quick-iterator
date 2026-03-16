import { Component, Output, EventEmitter, inject, input, signal, effect } from '@angular/core';
import { ColorUtilService } from '../../services/color-util.service';

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

  readonly cus = inject(ColorUtilService);

  readonly minDelta = 11;

  // Signal for table data
  readonly dataStruct = signal<TableData>([]);

  constructor() {
    effect(() => {
      const color = this.color();
      this.getTableData(color);
    });
  }

  selectColor(rowNum: number, columnNum: number) {
    const data = this.dataStruct();
    const targetColor = data[rowNum][columnNum];
    this.selectedColor.emit(targetColor);
  }

  getTextColor(bkgdColor: string) {
    return (this.cus.calcWcag2('white', bkgdColor) as number) >= 7 ? 'white' : 'black';
  }

  getTableData(color: string) {
    if (!color) {
      if (this.debug()) {
        console.warn(`no color for palette table`);
      }
      this.dataStruct.set([]);
      return;
    }
    const data = this.cus.generateAdaptiveVariants(color, this.minDelta);
    this.dataStruct.set(data);
  }
}
