import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './tone-picker.component.scss';

export interface GridCell {
  label: string;
  value?: unknown;
  background?: string;
  disabled?: boolean;
}

export interface GridRow {
  rowHeader?: string;
  cells: GridCell[];
}

@customElement('cc-tone-picker')
export class CcTonePicker extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ type: Array }) rows: GridRow[] = [];
  @property({ type: Array, attribute: 'columnheaders' }) columnHeaders: string[] = [];
  @property({ attribute: 'arialabel' }) override ariaLabel: string | null = null;
  @property() size: 'small' | 'normal' = 'normal';
  @property({ attribute: 'selectedvalue' }) selectedValue: string | null = null;
  @property({ type: Boolean, attribute: 'hideheaders' }) hideHeaders = false;
  @property({ type: Boolean, attribute: 'hideui' }) hideUi = false;

  @state() private focusedRow = 0;
  @state() private focusedCol = 0;
  @state() private selectedRow = -1;
  @state() private selectedCol = -1;
  @state() private selectedColor: string | null = null;
  @state() private announcement = '';

  readonly hintId = `gamut-hint-${Math.random().toString(36).slice(2, 9)}`;
  private edgeToggle = false;

  override connectedCallback() {
    super.connectedCallback();
    const { r, c } = this._findFirstInGamut();
    this.focusedRow = r;
    this.focusedCol = c;
    this.addEventListener('keydown', this._onKeydown.bind(this) as EventListener);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('selectedValue') && this.selectedValue) {
      const parsed = this._parseOklch(this.selectedValue);
      if (!parsed) return;
      const match = this._findCellByLC(parsed.l, parsed.c);
      if (match) {
        this.selectedRow = match.r;
        this.selectedCol = match.col;
        this.selectedColor = this.selectedValue;
        this.announcement = `Selected: ${this.selectedValue}`;
      }
    }
    if (changed.has('rows')) {
      const { r, c } = this._findFirstInGamut();
      this.focusedRow = r;
      this.focusedCol = c;
    }
  }

  get setsize() {
    let pos = 0;
    for (const row of this.rows) {
      for (const cell of row.cells) {
        if (!cell.disabled) pos++;
      }
    }
    return pos;
  }

  posinset(ri: number, ci: number): number {
    let pos = 0;
    for (const [r, row] of this.rows.entries()) {
      for (const [c, cell] of row.cells.entries()) {
        if (!cell.disabled) {
          pos++;
          if (r === ri && c === ci) return pos;
        }
      }
    }
    return 0;
  }

  private activate(ri: number, ci: number, cell: GridCell) {
    this.focusedRow = ri;
    this.focusedCol = ci;
    this.selectedRow = ri;
    this.selectedCol = ci;
    const v = cell.value as { l: number; c: number; h: number };
    const oklch = `oklch(${v.l.toFixed(2)} ${v.c.toFixed(3)} ${v.h})`;
    this.selectedColor = oklch;
    this.announcement = `Selected: ${oklch}`;
    this.dispatchEvent(
      new CustomEvent('color-select', { detail: oklch, bubbles: true, composed: true }),
    );
    this._focusButton(ri, ci);
  }

  private _onKeydown(e: KeyboardEvent) {
    const nav: Record<string, [number, number]> = {
      ArrowUp: [-1, 0],
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    if (nav[e.key]) {
      e.preventDefault();
      const [dr, dc] = nav[e.key];
      const moved = this._step(dr, dc);
      if (!moved) {
        this.edgeToggle = !this.edgeToggle;
        this.announcement = 'Edge of gamut' + (this.edgeToggle ? '​' : '');
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      this._jumpRowEdge(false);
    } else if (e.key === 'End') {
      e.preventDefault();
      this._jumpRowEdge(true);
    } else if (e.key === 'Enter' || e.key === ' ') {
      const r = this.focusedRow;
      const c = this.focusedCol;
      const cell = this.rows[r]?.cells[c];
      if (cell && !cell.disabled) {
        e.preventDefault();
        this.activate(r, c, cell);
      }
    }
  }

  private _step(dr: number, dc: number): boolean {
    const numRows = this.rows.length;
    const numCols = this.rows[0]?.cells.length ?? 0;
    let r = this.focusedRow + dr;
    let c = this.focusedCol + dc;
    while (r >= 0 && r < numRows && c >= 0 && c < numCols) {
      if (!this.rows[r].cells[c].disabled) {
        this.focusedRow = r;
        this.focusedCol = c;
        this._focusButton(r, c);
        return true;
      }
      r += dr;
      c += dc;
    }
    return false;
  }

  private _jumpRowEdge(toEnd: boolean) {
    const r = this.focusedRow;
    const cells = this.rows[r]?.cells ?? [];
    if (toEnd) {
      for (let c = cells.length - 1; c >= 0; c--) {
        if (!cells[c].disabled) {
          this.focusedCol = c;
          this._focusButton(r, c);
          return;
        }
      }
    } else {
      for (let c = 0; c < cells.length; c++) {
        if (!cells[c].disabled) {
          this.focusedCol = c;
          this._focusButton(r, c);
          return;
        }
      }
    }
  }

  private _focusButton(r: number, c: number) {
    const btn = this.querySelector<HTMLButtonElement>(`[data-row="${r}"][data-col="${c}"]`);
    btn?.focus();
  }

  private _findFirstInGamut(): { r: number; c: number } {
    for (let r = 0; r < this.rows.length; r++) {
      for (let c = 0; c < this.rows[r].cells.length; c++) {
        if (!this.rows[r].cells[c].disabled) return { r, c };
      }
    }
    return { r: 0, c: 0 };
  }

  private _parseOklch(value: string): { l: number; c: number; h: number } | null {
    const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
    if (!m) return null;
    return { l: parseFloat(m[1]), c: parseFloat(m[2]), h: parseFloat(m[3]) };
  }

  private _findCellByLC(l: number, c: number): { r: number; col: number } | null {
    for (let r = 0; r < this.rows.length; r++) {
      for (let col = 0; col < this.rows[r].cells.length; col++) {
        const cell = this.rows[r].cells[col];
        if (cell.disabled || !cell.value) continue;
        const v = cell.value as { l: number; c: number; h: number };
        if (Math.abs(v.l - l) < 0.006 && Math.abs(v.c - c) < 0.001) return { r, col };
      }
    }
    return null;
  }

  override render() {
    return html`
      <p id=${this.hintId} class="sr-only">
        Arrow keys navigate · Enter or Space activates · Blank cells are outside sRGB gamut
      </p>

      <div role="group">
        <table
          role="grid"
          aria-label=${this.ariaLabel || 'Tone picker'}
          aria-describedby=${this.hintId}
          class=${'gamut-grid' +
            (this.hideHeaders ? ' hide-headers' : '') +
            (this.size === 'small' ? ' size-small' : '')}
        >
          <thead>
            <tr role="row">
              <td class="corner" role="none"></td>
              ${this.columnHeaders.map(
                (header) => html`<th scope="col" role="columnheader" class="col-header">${header}</th>`,
              )}
            </tr>
          </thead>
          <tbody>
            ${this.rows.map(
              (row, ri) => html`
                <tr role="row">
                  <th scope="row" role="rowheader" class="row-header">${row.rowHeader}</th>
                  ${row.cells.map(
                    (cell, ci) =>
                      !cell.disabled
                        ? html`
                            <td role="gridcell" class="cell">
                              <button
                                role="radio"
                                class="cell-btn"
                                data-row=${ri}
                                data-col=${ci}
                                tabindex=${ri === this.focusedRow && ci === this.focusedCol ? 0 : -1}
                                style="background: ${cell.background}"
                                aria-label=${cell.label}
                                aria-checked=${ri === this.selectedRow && ci === this.selectedCol}
                                aria-setsize=${this.setsize}
                                aria-posinset=${this.posinset(ri, ci)}
                                @click=${() => this.activate(ri, ci, cell)}
                              ></button>
                            </td>
                          `
                        : html`<td role="gridcell" class="cell" aria-label="Out of gamut"></td>`,
                  )}
                </tr>
              `,
            )}
          </tbody>
        </table>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
        ${this.announcement}
      </div>

      <div class=${'ui' + (this.hideUi ? ' sr-only' : '')}>
        <div class="preview">
          ${this.selectedColor
            ? html`
                <span class="preview-swatch" style="background: ${this.selectedColor}" aria-hidden="true"></span>
                <span class="preview-code">${this.selectedColor}</span>
              `
            : html`<span class="preview-empty">No color selected</span>`}
        </div>
        <p class="hint">
          Arrow keys navigate · Enter or Space activates · Blank cells are outside sRGB gamut
        </p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-tone-picker': CcTonePicker;
  }
}
