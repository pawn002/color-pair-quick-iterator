import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { colorUtil } from '../../services/color-util.service';
import './color-slider.component.scss';

export interface ResetObject {
  reset: true;
}

@customElement('cc-color-slider')
export class CcColorSlider extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() override id = 'slider-0';
  @property() name = 'color-slider';
  @property() label = 'Lightness';
  @property() color = '';
  @property({ type: Boolean, attribute: 'constantchroma' }) constantChroma = false;
  @property({ type: Boolean, attribute: 'showgradient' }) showGradient = false;
  @property({ type: Object, attribute: false }) resetSlider: ResetObject | null = null;
  @property({ type: Boolean }) debug = false;

  @state() private slideMin = NaN;
  @state() private slideMax = NaN;
  @state() private slideInterval = NaN;
  @state() private value = NaN;
  @state() private initValue = NaN;
  @state() private devColorVariant = '';

  private readonly rangeDescId = `slider-range-${Math.random().toString(36).slice(2, 9)}`;

  get valueText() {
    return isNaN(this.value) ? '' : `${Math.round(this.value * 100)}%`;
  }

  get rangeDescription() {
    if (isNaN(this.slideMin) || isNaN(this.slideMax)) return '';
    return `Lightness range: ${Math.round(this.slideMin * 100)}% to ${Math.round(this.slideMax * 100)}%`;
  }

  override updated(changed: Map<string, unknown>) {
    const needsRecompute =
      changed.has('color') ||
      changed.has('showGradient') ||
      changed.has('resetSlider') ||
      changed.has('constantChroma');

    if (!needsRecompute) return;

    const sliderContainer = this.querySelector(`#cc-${this.id}`) as HTMLElement;
    if (!sliderContainer) {
      if (this.debug) console.warn('no slide container yet');
      return;
    }

    if (!this.color) {
      if (this.debug) console.error('no color specified');
      return;
    }

    this._getAndSetLightnessRange(this.color, { constantChroma: this.constantChroma });
    this._gradient(this.showGradient ? 'on' : 'off');

    if (this.resetSlider && this.initValue) {
      this._reset();
    }
  }

  private _sendInitialLightVariant() {
    this.dispatchEvent(
      new CustomEvent('color-variant', { detail: this.color, bubbles: true, composed: true }),
    );
    if (this.debug) this.devColorVariant = this.color;
  }

  private async _getAndSetLightnessRange(color: string, options?: { constantChroma: boolean }) {
    const rangeObject = await colorUtil.getMinMaxLight(color);
    if (!rangeObject) {
      console.error(`no range object for color ${color}`);
      return;
    }

    this._sendInitialLightVariant();

    this.slideMin = 0;
    this.slideMax = 1;

    if (options?.constantChroma) {
      this.slideMin = rangeObject.lightMin;
      this.slideMax = rangeObject.lightMax;
    }

    this.slideInterval = (this.slideMax - this.slideMin) / 80;

    const initialSlideValue = rangeObject.originalCoords[0];
    this.initValue = initialSlideValue;
    this.value = initialSlideValue;

    this._redefineGradientStops(this.slideMin, this.slideMax);
  }

  private _handleSliding(event: Event) {
    const inputElem = event.target as HTMLInputElement;
    if (inputElem && this.color) {
      const lightValue = parseFloat(inputElem.value);
      const lightnessVariant = colorUtil.createSrgbColor(this.color, lightValue);

      if (this.debug) {
        console.log(`slide modding ${this.color} to ${lightnessVariant}`);
        this.devColorVariant = lightnessVariant ?? '';
      }

      this.dispatchEvent(
        new CustomEvent('color-variant', { detail: lightnessVariant, bubbles: true, composed: true }),
      );
    } else {
      console.error('no color specified');
    }
  }

  private _reset() {
    const element = this.querySelector(`#${this.id}`) as HTMLInputElement;
    if (!element) {
      console.error(`no element found with id: ${this.id}`);
      return;
    }
    if (!isNaN(this.initValue)) {
      element.value = this.initValue.toString();
    }
  }

  private _gradient(val: 'on' | 'off') {
    const targetElem = this.querySelector(`#cc-${this.id}`) as HTMLElement;
    if (!targetElem) {
      if (this.debug) console.warn('no elem to assign gradient to.');
      return;
    }
    targetElem.style.background =
      val === 'on' ? 'var(--gradient-background)' : 'var(--default-background)';
  }

  private _redefineGradientStops(lightMin: number, lightMax: number) {
    if (!this.color) return;

    const targetElement = this.querySelector(`#cc-${this.id}`) as HTMLElement;
    if (!targetElement) return;

    const stops = [
      '--grad-stop-0',
      '--grad-stop-1',
      '--grad-stop-2',
      '--grad-stop-3',
      '--grad-stop-4',
      '--grad-stop-5',
    ];

    const stopInterval = (lightMax - lightMin) / (stops.length - 1);
    const stopVals: (string | null)[] = [];

    for (let i = 0; i < stops.length; i++) {
      const targetLight = stopInterval * i + lightMin;
      stopVals.push(colorUtil.createSrgbColor(this.color, targetLight));
    }

    for (let i = 0; i < stops.length; i++) {
      const stopColor = stopVals[i];
      if (stopColor) targetElement.style.setProperty(stops[i], stopColor);
    }
  }

  override render() {
    return html`
      <div id=${'cc-' + this.id} class="comp-container">
        <label for=${this.id} class="sr-only">${this.label}</label>
        ${this.slideMin !== this.slideMax
          ? html`
              <span id=${this.rangeDescId} class="sr-only">${this.rangeDescription}</span>
              <input
                type="range"
                name=${this.name}
                id=${this.id}
                min=${this.slideMin}
                max=${this.slideMax}
                step=${this.slideInterval}
                .value=${String(this.value)}
                aria-valuetext=${this.valueText}
                aria-describedby=${this.rangeDescId}
                @input=${this._handleSliding}
              />
            `
          : !isNaN(this.slideMin)
            ? html`
                <div class="special-case">
                  <div>!</div>
                </div>
              `
            : ''}
      </div>
      <div class="dev-overlay ${this.debug ? 'active' : ''}">
        <h2>dev overlay</h2>
        <div
          class="light-variant-chip"
          style="border-color: ${this.devColorVariant}; background-color: ${this.color}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-color-slider': CcColorSlider;
  }
}
