import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { colorUtil, type TableColorCell, type TableData } from '../../services/color-util.service';
import '../tone-picker/tone-picker';
import type { GridRow, GridCell } from '../tone-picker/tone-picker';
import './palette-table.component.scss';

@customElement('cc-palette-table')
export class CcPaletteTable extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() color = '';
  @property({ type: Boolean }) debug = false;

  @state() private dataStruct: TableData = [];

  readonly minDelta = 11;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('color')) {
      this._getTableData(this.color);
    }
  }

  get tonePickerRows(): GridRow[] {
    const data = this.dataStruct;
    if (!data.length) return [];
    const { lightnesses, chromas, cellMap } = this._buildIndex(data);
    return lightnesses.map((l) => ({
      rowHeader: l.toFixed(2),
      cells: chromas.map((c): GridCell => {
        const cell = cellMap.get(this._cellKey(l, c));
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
  }

  get tonePickerHeaders(): string[] {
    const data = this.dataStruct;
    if (!data.length) return [];
    const { chromas } = this._buildIndex(data);
    return chromas.map((c) => c.toFixed(2));
  }

  get selectedOklch(): string | null {
    const hex = this.color;
    if (!hex) return null;
    try {
      return colorUtil.hexToOklchString(hex);
    } catch {
      return null;
    }
  }

  private _onTonePickerSelect(event: CustomEvent) {
    const oklch = event.detail as string;
    const parsed = this._parseOklch(oklch);
    if (!parsed) return;

    const { cellMap } = this._buildIndex(this.dataStruct);
    for (const [, cell] of cellMap) {
      if (
        Math.abs(cell.lightness - parsed.l) < 0.001 &&
        Math.abs(cell.chroma - parsed.c) < 0.001
      ) {
        this.dispatchEvent(
          new CustomEvent('selected-color', { detail: cell, bubbles: true, composed: true }),
        );
        return;
      }
    }
    const fallback: TableColorCell = {
      color: oklch,
      lightness: NaN,
      chroma: NaN,
      hue: NaN,
      deltaE: NaN,
      deltaLightness: NaN,
      deltaChroma: NaN,
    };
    this.dispatchEvent(
      new CustomEvent('selected-color', { detail: fallback, bubbles: true, composed: true }),
    );
  }

  private _getTableData(color: string) {
    if (!color) {
      if (this.debug) console.warn('no color for palette table');
      this.dataStruct = [];
      return;
    }
    this.dataStruct = colorUtil.generateAdaptiveVariants(color, this.minDelta);
  }

  private _buildIndex(data: TableData) {
    const cellMap = new Map<string, TableColorCell>();
    const chromaSet = new Set<number>();
    const lightnessSet = new Set<number>();

    for (const row of data) {
      for (const cell of row) {
        chromaSet.add(cell.chroma);
        lightnessSet.add(cell.lightness);
        cellMap.set(this._cellKey(cell.lightness, cell.chroma), cell);
      }
    }

    const chromas = [...chromaSet].sort((a, b) => a - b);
    const lightnesses = [...lightnessSet].sort((a, b) => b - a);

    return { lightnesses, chromas, cellMap };
  }

  private _cellKey(l: number, c: number): string {
    return `${Math.round(l * 1000)},${Math.round(c * 1000)}`;
  }

  private _parseOklch(value: string): { l: number; c: number; h: number } | null {
    const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
    if (!m) return null;
    return { l: parseFloat(m[1]), c: parseFloat(m[2]), h: parseFloat(m[3]) };
  }

  override render() {
    return html`
      <div class="comp-container">
        ${this.tonePickerRows.length
          ? html`
              <cc-tone-picker
                .rows=${this.tonePickerRows}
                .columnHeaders=${this.tonePickerHeaders}
                size="small"
                hideHeaders
                hideUi
                selectedValue=${this.selectedOklch ?? ''}
                ariaLabel=${'Color tones — hue ' + (this.dataStruct[0]?.[0]?.hue?.toFixed(0) ?? '') + '°'}
                @color-select=${this._onTonePickerSelect}
              ></cc-tone-picker>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-palette-table': CcPaletteTable;
  }
}
