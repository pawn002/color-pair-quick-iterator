import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { colorUtil, type ColorMetaObj } from '../../services/color-util.service';
import { colorMetrics } from '../../services/color-metrics.service';
import '../../_candor/table/table';
import './metadata.component.scss';

interface DifferencesDataObj {
  deltaE: number;
  okca: number;
  wcag2Old: number;
  wcag2New: number;
  apca: number;
}

interface SuccessesObj {
  text: 'pass' | 'fail' | null;
  largeText: 'pass' | 'fail' | null;
  nonText: 'pass' | 'fail' | null;
  objectMinDimension: number | string;
}

const INFO_SVG = html`
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    />
  </svg>
`;

@customElement('cc-metadata')
export class CcMetadata extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ attribute: 'colorone' }) colorOne = '';
  @property({ attribute: 'colortwo' }) colorTwo = '';
  @property({ type: Boolean }) debug = false;

  get colorOneMeta(): ColorMetaObj | null {
    if (!this.colorOne) return null;
    return colorUtil.getColorMeta(this.colorOne);
  }

  get colorTwoMeta(): ColorMetaObj | null {
    if (!this.colorTwo) return null;
    return colorUtil.getColorMeta(this.colorTwo);
  }

  get differences(): DifferencesDataObj {
    const result: DifferencesDataObj = {
      deltaE: NaN,
      okca: NaN,
      wcag2Old: NaN,
      wcag2New: NaN,
      apca: NaN,
    };
    if (!this.colorOne || !this.colorTwo) return result;

    result.deltaE = colorUtil.calcDeltaE(this.colorOne, this.colorTwo) ?? NaN;
    result.okca = colorMetrics.getContrast(this.colorOne, this.colorTwo, 'okca') ?? NaN;
    result.wcag2New = colorMetrics.getContrast(this.colorOne, this.colorTwo, 'bpca') ?? NaN;
    result.wcag2Old = colorUtil.calcWcag2(this.colorOne, this.colorTwo) ?? NaN;
    result.apca = colorMetrics.getContrast(this.colorOne, this.colorTwo, 'apca') ?? NaN;

    return result;
  }

  get successes(): SuccessesObj {
    const result: SuccessesObj = {
      text: null,
      largeText: null,
      nonText: null,
      objectMinDimension: NaN,
    };
    if (!this.colorOne || !this.colorTwo) return result;

    const okcaScore = colorMetrics.getContrast(this.colorOne, this.colorTwo, 'okca');
    const apcaScore = colorMetrics.getContrast(this.colorOne, this.colorTwo, 'apca');

    if (okcaScore == null || !apcaScore) return result;
    if (okcaScore < 0 || Math.abs(apcaScore) < 0) return result;

    result.text = okcaScore >= 4.5 ? 'pass' : 'fail';
    result.largeText = okcaScore >= 3 ? 'pass' : 'fail';
    result.nonText = okcaScore >= 3 ? 'pass' : 'fail';
    const minDimension = colorUtil.getMinObjectDimension(apcaScore);
    result.objectMinDimension = Number.isNaN(minDimension) ? 'invisible' : minDimension;

    return result;
  }

  private _emitNote(note: string) {
    this.dispatchEvent(
      new CustomEvent('note-requested', { detail: note, bubbles: true, composed: true }),
    );
  }

  override render() {
    const s = this.successes;
    const d = this.differences;
    const m1 = this.colorOneMeta;
    const m2 = this.colorTwoMeta;

    return html`
      <div class="comp-container">
        <div>
          <h3>Successes and Minimums</h3>
          <cc-table .compact=${true}>
            <table>
              <caption class="sr-only">Various pass, fails or minimum dimensions related to visual elements.</caption>
              <thead class="sr-only"><tr><th>Criteria</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Text</td><td class="numeric">${s.text}</td></tr>
                <tr><td class="label">Large Text</td><td class="numeric">${s.largeText}</td></tr>
                <tr><td class="label">Non-text</td><td class="numeric">${s.nonText}</td></tr>
                <tr>
                  <td class="label label--with-info">
                    Object
                    <candor-tooltip text="About Object" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Object" @click=${() => this._emitNote('apca object')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${s.objectMinDimension}</td>
                </tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Differences</h3>
          <cc-table .compact=${true}>
            <table>
              <caption class="sr-only">Differences between Foreground Color and Background Color.</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr>
                  <td class="label label--with-info">
                    Delta E
                    <candor-tooltip text="About Delta E" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Delta E" @click=${() => this._emitNote('deltaE')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${d.deltaE}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    OKCA
                    <candor-tooltip text="About OKCA" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About OKCA" @click=${() => this._emitNote('okca')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${d.okca}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    Perceptual contrast
                    <candor-tooltip text="About Perceptual contrast" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Perceptual contrast" @click=${() => this._emitNote('apca')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${d.apca}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    WCAG 2 compatible
                    <candor-tooltip text="About WCAG 2 compatible" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About WCAG 2 compatible" @click=${() => this._emitNote('bpca')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${d.wcag2New}</td>
                </tr>
                <tr>
                  <td class="label label--with-info">
                    WCAG 2
                    <candor-tooltip text="About WCAG 2" position="right">
                      <candor-button variant="ghost" class="button--icon" aria-label="About WCAG 2" @click=${() => this._emitNote('wcag2')}>${INFO_SVG}</candor-button>
                    </candor-tooltip>
                  </td>
                  <td class="numeric">${d.wcag2Old}</td>
                </tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Foreground Color</h3>
          <cc-table .compact=${true}>
            <table>
              <caption class="sr-only">Foreground Color Metadata</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Saturation</td><td class="numeric">${m1?.saturation}</td></tr>
                <tr><td class="label">Lightness</td><td class="numeric">${m1?.lightness}</td></tr>
                <tr><td class="label">Chroma</td><td class="numeric">${m1?.chroma}</td></tr>
                <tr><td class="label">Hue</td><td class="numeric">${m1?.hue}</td></tr>
              </tbody>
            </table>
          </cc-table>
        </div>

        <div>
          <h3>Background Color</h3>
          <cc-table .compact=${true}>
            <table>
              <caption class="sr-only">Background Color Metadata</caption>
              <thead class="sr-only"><tr><th>Measurement</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td class="label">Saturation</td><td class="numeric">${m2?.saturation}</td></tr>
                <tr><td class="label">Lightness</td><td class="numeric">${m2?.lightness}</td></tr>
                <tr><td class="label">Chroma</td><td class="numeric">${m2?.chroma}</td></tr>
                <tr><td class="label">Hue</td><td class="numeric">${m2?.hue}</td></tr>
              </tbody>
            </table>
          </cc-table>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-metadata': CcMetadata;
  }
}
