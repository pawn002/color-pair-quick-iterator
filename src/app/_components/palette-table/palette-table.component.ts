import {
  Component,
  Output,
  EventEmitter,
  inject,
  input,
  signal,
  computed,
  effect,
} from '@angular/core';
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

  readonly lightSteps = 5;
  readonly chromaSteps = 14;

  // Signals for table data and headers
  readonly dataStruct = signal<TableData>([]);
  readonly tableHeaders = computed<number[]>(() => {
    const data = this.dataStruct();
    if (!data.length || !data[0].length) return [];
    return data[0].map((cell) => cell.chroma);
  });

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

  async getTableData(color: string) {
    if (!color) {
      if (this.debug()) {
        console.warn(`no color for palette table`);
      }
      this.dataStruct.set([]);
      return;
    }
    const data = await this.cus.generateAllOklchVariants(color, this.lightSteps, this.chromaSteps);
    this.dataStruct.set(data);
  }
}
