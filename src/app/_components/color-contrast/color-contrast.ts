import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { colorMetrics } from '../../services/color-metrics.service';
import { colorUtil } from '../../services/color-util.service';
import type { ContrastType } from '../../services/color-metrics.service';
import './color-contrast.component.scss';

@customElement('cc-color-contrast')
export class CcColorContrast extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ attribute: 'colorone' }) colorOne = '';
  @property({ attribute: 'colortwo' }) colorTwo = '';
  @property({ attribute: 'contrasttype' }) contrastType: ContrastType | 'apca object' = 'okca';
  @property({ type: Boolean }) debug = false;

  @state() private contrastScore = NaN;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('colorOne') || changed.has('colorTwo') || changed.has('contrastType')) {
      this._computeScore();
    }
  }

  private _computeScore() {
    const { colorOne, colorTwo, contrastType } = this;
    if (!colorOne || !colorTwo || !contrastType) {
      if (this.debug) console.warn('contrast comp missing inputs');
      return;
    }

    let calcType: ContrastType;
    if (contrastType === 'apca object') {
      calcType = 'apca';
    } else if (contrastType === 'deltaE') {
      calcType = 'deltaE';
    } else {
      calcType = contrastType;
    }

    const score = colorMetrics.getContrast(colorOne, colorTwo, calcType);

    if (score && contrastType === 'apca object') {
      this.contrastScore = colorUtil.getMinObjectDimension(score);
      return;
    }

    this.contrastScore = score === null || score === undefined ? NaN : score;
  }

  get contrastAnnouncement() {
    return isNaN(this.contrastScore) ? '' : `Contrast score: ${this.contrastScore}`;
  }

  override render() {
    return html`
      <div class="comp-container" aria-hidden="true">
        <div class="score-container">
          <div id="contrast-score" class="score">
            ${this.contrastScore ? this.contrastScore : '!'}
          </div>
        </div>
      </div>
      <div class="sr-only" role="status" aria-live="polite" aria-atomic="true">
        ${this.contrastAnnouncement}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-color-contrast': CcColorContrast;
  }
}
