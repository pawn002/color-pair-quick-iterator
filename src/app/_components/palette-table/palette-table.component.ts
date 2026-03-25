import {
  Component,
  Output,
  EventEmitter,
  inject,
  input,
  signal,
  effect,
  computed,
} from '@angular/core';
import { ColorUtilService } from '../../services/color-util.service';
import { TonePickerComponent, GridRow, GridCell } from '../tone-picker/tone-picker.component';

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
  imports: [TonePickerComponent],
})
export class PaletteTableComponent {
  color = input<string>('');
  debug = input<boolean>(false);

  @Output() selectedColor = new EventEmitter<TableColorCell>();

  readonly cus = inject(ColorUtilService);

  readonly minDelta = 11;

  readonly dataStruct = signal<TableData>([]);

  constructor() {
    effect(() => {
      const color = this.color();
      this.getTableData(color);
    });
  }

  // ─── Tone-picker data ───────────────────────────────────────────────────────

  readonly tonePickerRows = computed<GridRow[]>(() => {
    const data = this.dataStruct();
    if (!data.length) return [];
    const { lightnesses, chromas, cellMap } = this.buildIndex(data);
    return lightnesses.map((l) => ({
      rowHeader: l.toFixed(2),
      cells: chromas.map((c): GridCell => {
        const cell = cellMap.get(this.cellKey(l, c));
        if (cell) {
          return {
            label: cell.color,
            background: cell.color,
            value: { l: cell.lightness, c: cell.chroma, h: cell.hue },
            disabled: false,
          };
        }
        return { label: '', disabled: true };
      }),
    }));
  });

  readonly tonePickerHeaders = computed<string[]>(() => {
    const data = this.dataStruct();
    if (!data.length) return [];
    const { chromas } = this.buildIndex(data);
    return chromas.map((c) => c.toFixed(2));
  });

  readonly selectedOklch = computed<string | null>(() => {
    const hex = this.color();
    if (!hex) return null;
    try {
      return this.cus.hexToOklchString(hex);
    } catch {
      return null;
    }
  });

  // ─── Handlers ──────────────────────────────────────────────────────────────

  onTonePickerSelect(oklch: string): void {
    const parsed = this.parseOklch(oklch);
    if (!parsed) return;
    const data = this.dataStruct();
    const { cellMap } = this.buildIndex(data);
    // Find the closest cell by L and C
    for (const [, cell] of cellMap) {
      if (
        Math.abs(cell.lightness - parsed.l) < 0.001 &&
        Math.abs(cell.chroma - parsed.c) < 0.001
      ) {
        this.selectedColor.emit(cell);
        return;
      }
    }
    // Fallback: emit with just the parsed hex if no exact match
    const fallback = new TableColorCell();
    fallback.color = oklch;
    this.selectedColor.emit(fallback);
  }

  selectColor(rowNum: number, columnNum: number): void {
    const data = this.dataStruct();
    const targetColor = data[rowNum][columnNum];
    this.selectedColor.emit(targetColor);
  }

  getTextColor(bkgdColor: string): string {
    return (this.cus.calcWcag2('white', bkgdColor) as number) >= 7 ? 'white' : 'black';
  }

  getTableData(color: string): void {
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

  // ─── Private helpers ───────────────────────────────────────────────────────

  private buildIndex(data: TableData): {
    lightnesses: number[];
    chromas: number[];
    cellMap: Map<string, TableColorCell>;
  } {
    const cellMap = new Map<string, TableColorCell>();
    const chromaSet = new Set<number>();
    const lightnessSet = new Set<number>();

    for (const row of data) {
      for (const cell of row) {
        chromaSet.add(cell.chroma);
        lightnessSet.add(cell.lightness);
        cellMap.set(this.cellKey(cell.lightness, cell.chroma), cell);
      }
    }

    const chromas = [...chromaSet].sort((a, b) => a - b);
    const lightnesses = [...lightnessSet].sort((a, b) => b - a);

    return { lightnesses, chromas, cellMap };
  }

  private cellKey(l: number, c: number): string {
    return `${Math.round(l * 1000)},${Math.round(c * 1000)}`;
  }

  private parseOklch(value: string): { l: number; c: number; h: number } | null {
    const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
    if (!m) return null;
    return { l: parseFloat(m[1]), c: parseFloat(m[2]), h: parseFloat(m[3]) };
  }
}
