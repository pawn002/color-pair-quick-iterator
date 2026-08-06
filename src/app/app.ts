import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { colorUtil } from './services/color-util.service';
import type { ContrastType } from './services/color-metrics.service';
import type { TableColorCell } from './services/color-util.service';
import type { ResetObject } from './_components/color-slider/color-slider';
import type { AlertMessageObj } from './_components/alert/alert';


import './_components/alert/alert';
import './_components/color-contrast/color-contrast';
import './_components/color-picker/color-picker';
import './_components/color-slider/color-slider';
import './_components/copy-to-clipboard-button/copy-to-clipboard-button';
import './_components/metadata/metadata';
import './_components/palette-table/palette-table';

import './app.scss';

const NOTE_MODAL_TITLES: Record<string, string> = {
  okca: 'OKCA',
  apca: 'Perceptual contrast',
  bpca: 'WCAG 2 compatible',
  'apca object': 'Object',
  deltaE: 'Delta E',
  accessibility: 'Screen reader and low vision workflows',
  wcag2: 'WCAG 2',
  constantChroma: 'Constant chroma',
  showGradient: 'Show Gradient',
};

@customElement('cc-app')
export class CcApp extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @state() private fgColor = '';
  @state() private bgColor = '';
  @state() private fgComparedColor = '';
  @state() private bgComparedColor = '';
  @state() private contrastType: ContrastType | 'apca object' = 'okca';
  @state() private constantChroma = true;
  @state() private showGradient = true;
  @state() private activeNoteModal: string | null = null;
  @state() private currentAlertMessage: AlertMessageObj = { message: '' };
  @state() private resetSlider: ResetObject | null = null;

  private isInitializing = true;

  get noteModalTitle() {
    const note = this.activeNoteModal;
    return note ? (NOTE_MODAL_TITLES[note] ?? '') : '';
  }

  override connectedCallback() {
    super.connectedCallback();
    const hasUrlState = this._loadStateFromUrl();
    if (!hasUrlState) {
      this._setRandomColorPair(true);
    }
    setTimeout(() => {
      this.isInitializing = false;
    });
  }

  private _updateUrl() {
    if (this.isInitializing) return;
    const params = new URLSearchParams();
    if (this.fgColor) params.set('fg', this.fgColor);
    if (this.bgColor) params.set('bg', this.bgColor);
    if (this.contrastType !== 'okca') params.set('type', this.contrastType);
    if (!this.constantChroma) params.set('chroma', 'false');
    if (!this.showGradient) params.set('gradient', 'false');
    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/';
    window.history.replaceState(null, '', newUrl);
  }

  private _loadStateFromUrl(): boolean {
    const urlParams = new URLSearchParams(window.location.search);
    const fg = urlParams.get('fg');
    const bg = urlParams.get('bg');
    const type = urlParams.get('type') as ContrastType | 'apca object' | null;
    const chroma = urlParams.get('chroma');
    const gradient = urlParams.get('gradient');

    let hasUrlState = false;

    if (fg) { this.fgColor = fg; hasUrlState = true; }
    if (bg) { this.bgColor = bg; hasUrlState = true; }
    if (type && ['apca', 'bpca', 'apca object', 'deltaE', 'okca'].includes(type)) {
      this.contrastType = type;
    }
    if (chroma !== null) this.constantChroma = chroma !== 'false';
    if (gradient !== null) this.showGradient = gradient !== 'false';

    return hasUrlState;
  }

  private _handleFgColorInput(event: CustomEvent) {
    this.fgColor = event.detail;
    this._updateUrl();
  }

  private _handleBgColorInput(event: CustomEvent) {
    this.bgColor = event.detail;
    this._updateUrl();
  }

  private _handleFgSliderInput(event: CustomEvent) {
    if (event.detail) this.fgComparedColor = event.detail;
  }

  private _handleBgSliderInput(event: CustomEvent) {
    if (event.detail) this.bgComparedColor = event.detail;
  }

  private _handleCopyEvent(event: CustomEvent) {
    if (event.detail.copied) {
      this._alertUser({ message: `${event.detail.color} copied to clipboard.` });
    } else {
      console.error('color copy error.');
    }
  }

  private _handleFgPaletteSelect(event: CustomEvent) {
    const cell = event.detail as TableColorCell;
    this.fgColor = cell.color;
    this._alertUser({ message: `Color picker One changed to ${cell.color}` });
  }

  private _handleBgPaletteSelect(event: CustomEvent) {
    const cell = event.detail as TableColorCell;
    this.bgColor = cell.color;
    this._alertUser({ message: `Color picker Two changed to ${cell.color}` });
  }

  private _toggleConstantChroma(event: CustomEvent) {
    this.constantChroma = event.detail;
    this._resetSliders();
    this._updateUrl();
  }

  private _toggleShowGradient(event: CustomEvent) {
    this.showGradient = event.detail;
    this._updateUrl();
  }

  private _swapColors() {
    if (!this.fgColor || !this.bgColor) return;
    const tmp = this.fgColor;
    this.fgColor = this.bgColor;
    this.bgColor = tmp;
    this._alertUser({ message: 'Swapped foreground and background colors.' });
    this._updateUrl();
  }

  private async _setRandomColorPair(initialAppColors = false) {
    const initColorPair = await colorUtil.getRandomColorPair();
    const randomColorPair = await colorUtil.adjustColorPairForPresentation(initColorPair);
    setTimeout(() => {
      this.fgColor = randomColorPair[0];
      this.bgColor = randomColorPair[1];
      if (!initialAppColors) {
        this._alertUser({
          message: `Random color pair generated: ${randomColorPair[0]}, and ${randomColorPair[1]}`,
        });
      }
      this._updateUrl();
    }, 0);
  }

  private _resetSliders() {
    this.resetSlider = { reset: true };
    this._alertUser({ message: 'Resetted color sliders to initial states.' });
  }

  private async _matchChromas() {
    if (!this.fgColor || !this.bgColor) return;
    const matchedColors = await colorUtil.matchChromas([this.fgColor, this.bgColor]);
    if (matchedColors.success && matchedColors.colors && matchedColors.chroma) {
      this.fgColor = matchedColors.colors[0];
      this.bgColor = matchedColors.colors[1];
      this._alertUser({ message: 'Chroma matched foreground and background colors.' });
      this._updateUrl();
    } else {
      this._alertUser({ message: 'Unable to match chroma across colors.' });
    }
  }

  private _alertUser(message: AlertMessageObj) {
    this.currentAlertMessage = { ...message };
  }

  private _handleNoteRequested(event: CustomEvent) {
    this.activeNoteModal = event.detail;
  }

  // candor-modal emits `close` only when it closes, so there is no state to
  // read off the event — the local element's `open-change` carried a boolean
  // because it fired in both directions.
  private _handleModalClose() {
    this.activeNoteModal = null;
  }

  private _handleContrastTypeChange(event: CustomEvent) {
    this.contrastType = event.detail as ContrastType | 'apca object';
    this._updateUrl();
  }

  private readonly _INFO_SVG = html`
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  `;

  override render() {
    return html`
      <a class="sr-only" href="#main-content">Skip to main content</a>
      <main class="app-container" id="main-content">
        <div class="primary-stack">
          <candor-card class="title-and-sliders" variant="elevated" padding="none">
            <div class="title-and-score">
              <h1>Colors Contrast</h1>
              <cc-color-contrast
                colorone=${this.fgComparedColor}
                colortwo=${this.bgComparedColor}
                contrasttype=${this.contrastType}
              ></cc-color-contrast>
            </div>

            <div class="title-and-sliders__body">
              <candor-accordion-item heading="How to use this app." variant="quiet">
                <p>
                  <span class="visual-header">Quick Start:</span>
                  Input a foreground and background color. Use the sliders to adjust tone until you reach
                  your target contrast, then copy each color to the clipboard.
                </p>
                <candor-button variant="secondary" size="small" @click=${() => (this.activeNoteModal = 'accessibility')}>
                  Screen reader and low vision workflows
                </candor-button>
              </candor-accordion-item>

              <h2 class="sr-only">Main Color Controls</h2>

              <h3>Foreground Color</h3>

              <div class="slide-group">
                <candor-tooltip text="Choose foreground color" position="bottom">
                  <cc-color-picker
                    inputid="cp-0"
                    inputname="Foreground Color"
                    label="Foreground Color"
                    comparedcolor=${this.fgComparedColor}
                    color=${this.fgColor}
                    @selected-color=${this._handleFgColorInput}
                  ></cc-color-picker>
                </candor-tooltip>
                <cc-color-slider
                  id="slider-0"
                  name="Foreground Slider"
                  label="Foreground lightness"
                  color=${this.fgColor}
                  ?constantchroma=${this.constantChroma}
                  ?showgradient=${this.showGradient}
                  .resetSlider=${this.resetSlider}
                  @color-variant=${this._handleFgSliderInput}
                ></cc-color-slider>
                <candor-tooltip text="Copy foreground color" position="bottom">
                  <cc-copy-to-clipboard-button
                    color=${this.fgComparedColor}
                    label="Copy foreground color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                </candor-tooltip>
              </div>

              <candor-accordion-item heading="Foreground LCH Limits" variant="subtle">
                <div class="pallette-viz-content">
                  <cc-palette-table
                    color=${this.fgColor}
                    @selected-color=${this._handleFgPaletteSelect}
                  ></cc-palette-table>
                </div>
                <p class="lch-limits-intro">
                  Variants of your foreground color within the sRGB gamut. Hue constrains your lightness
                  and chroma options — for example, strong yellows are only possible at high lightness.
                </p>
              </candor-accordion-item>

              <h3>Background Color</h3>

              <div class="slide-group">
                <candor-tooltip text="Choose background color" position="bottom">
                  <cc-color-picker
                    inputid="cp-1"
                    inputname="Background Color"
                    label="Background Color"
                    comparedcolor=${this.bgComparedColor}
                    color=${this.bgColor}
                    @selected-color=${this._handleBgColorInput}
                  ></cc-color-picker>
                </candor-tooltip>
                <cc-color-slider
                  id="slider-1"
                  name="Background Slider"
                  label="Background lightness"
                  color=${this.bgColor}
                  ?constantchroma=${this.constantChroma}
                  ?showgradient=${this.showGradient}
                  .resetSlider=${this.resetSlider}
                  @color-variant=${this._handleBgSliderInput}
                ></cc-color-slider>
                <candor-tooltip text="Copy background color" position="bottom">
                  <cc-copy-to-clipboard-button
                    color=${this.bgComparedColor}
                    label="Copy background color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                </candor-tooltip>
              </div>

              <candor-accordion-item heading="Background LCH Limits" variant="subtle">
                <div class="pallette-viz-content">
                  <cc-palette-table
                    color=${this.bgColor}
                    @selected-color=${this._handleBgPaletteSelect}
                  ></cc-palette-table>
                </div>
                <p class="lch-limits-intro">
                  Variants of your background color within the sRGB gamut. Hue constrains your lightness
                  and chroma options — for example, strong yellows are only possible at high lightness.
                </p>
              </candor-accordion-item>
            </div>
          </candor-card>

          <candor-card class="quick-actions" variant="elevated" padding="sm">
            <div class="quick-actions__buttons">
              <candor-tooltip text="Swap foreground and background">
                <candor-button
                  variant="tertiary"
                  class="button--icon"
                  aria-label="Swap Selected Colors"
                  ?disabled=${!this.fgColor || !this.bgColor}
                  @click=${this._swapColors}
                >
                  <svg class="swap-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <g>
                      <path d="M6.29,8.71a1,1,0,0,1,0-1.42l4-4a1,1,0,1,1,1.42,1.42L9.41,7H19a7,7,0,0,1,7,7,1,1,0,0,1-2,0,5,5,0,0,0-5-5H9.41l2.3,2.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0ZM21.71,19.29a1,1,0,0,0-1.42,1.42L22.59,23H13a5,5,0,0,1-5-5,1,1,0,0,0-2,0,7,7,0,0,0,7,7h9.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,0-1.42Z" />
                    </g>
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="Match chromas">
                <candor-button variant="tertiary" class="button--icon" aria-label="Harmonize Color Pair To Same Chroma" @click=${this._matchChromas}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" xml:space="preserve">
                    <path d="M43,39c1.66,0,3,1.34,3,3s-1.34,3-3,3H33c-1.66,0-3-1.34-3-3s1.34-3,3-3H43z" />
                    <path d="M20,17v3h-3c-1.66,0-3,1.34-3,3s1.34,3,3,3h3v3c0,1.66,1.34,3,3,3s3-1.34,3-3v-3h3c1.66,0,3-1.34,3-3s-1.34-3-3-3h-3v-3  c0-1.66-1.34-3-3-3S20,15.34,20,17z M56,12v40c0,2.21-1.79,4-4,4H12c-2.21,0-4-1.79-4-4V12c0-2.21,1.79-4,4-4h40  C54.21,8,56,9.79,56,12z M50,50V14L14,50H50z" />
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="Reset sliders">
                <candor-button variant="tertiary" class="button--icon" aria-label="Reset Color Sliders" @click=${this._resetSliders}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,3A8.92277,8.92277,0,0,0,4.5,7.05823V5H3v5H8V8.5H5.38165A7.4775,7.4775,0,1,1,4.5,12H3a9,9,0,1,0,9-9Z" />
                  </svg>
                </candor-button>
              </candor-tooltip>

              <candor-tooltip text="New random pair">
                <candor-button variant="tertiary" class="button--icon" aria-label="Create Random Color Pair" @click=${() => this._setRandomColorPair()}>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333 333" fill-rule="evenodd" clip-rule="evenodd">
                    <g>
                      <rect fill="none" stroke="currentColor" stroke-width="14" x="24" y="167" width="138" height="138" rx="26" ry="26" />
                      <g>
                        <g>
                          <circle cx="118" cy="199" r="12" />
                          <circle cx="118" cy="236" r="12" />
                          <circle cx="118" cy="272" r="12" />
                        </g>
                        <g>
                          <circle cx="67" cy="199" r="12" />
                          <circle cx="67" cy="236" r="12" />
                          <circle cx="67" cy="272" r="12" />
                        </g>
                      </g>
                      <rect fill="none" stroke="currentColor" stroke-width="14" transform="matrix(0.707107 -0.707107 0.707107 0.707107 125.466 115.35)" width="138" height="138" rx="26" ry="26" />
                      <circle transform="matrix(0.876112 -0.876112 0.876112 0.876112 222.904 115.349)" r="10" />
                    </g>
                  </svg>
                </candor-button>
              </candor-tooltip>
            </div>
          </candor-card>

          <candor-card class="options" variant="elevated" padding="md">
            <h2>Options</h2>

            <candor-accordion-item heading="Change how Colors Contrast works.">
              <div>
                <h3>Colors Contrast Value</h3>
                <div class="radio-section">
                  ${['okca', 'apca', 'bpca', 'apca object', 'deltaE'].map((type) => {
                    const labels: Record<string, string> = {
                      okca: 'OKCA',
                      apca: 'Perceptual',
                      bpca: 'WCAG 2 compatible',
                      'apca object': 'Object',
                      deltaE: 'Delta E',
                    };
                    const aboutLabels: Record<string, string> = {
                      okca: 'About OKCA',
                      apca: 'About Perceptual contrast',
                      bpca: 'About WCAG 2 compatible',
                      'apca object': 'About Object contrast',
                      deltaE: 'About Delta E',
                    };
                    return html`
                      <div class="radio-item">
                        <candor-radio
                          name="contrastType"
                          value=${type}
                          label=${labels[type]}
                          ?checked=${this.contrastType === type}
                          @change=${this._handleContrastTypeChange}
                        ></candor-radio>
                        <candor-tooltip text=${aboutLabels[type]} position="left">
                          <candor-button variant="ghost" class="button--icon" aria-label=${aboutLabels[type]} @click=${() => (this.activeNoteModal = type)}>
                            ${this._INFO_SVG}
                          </candor-button>
                        </candor-tooltip>
                      </div>
                    `;
                  })}
                </div>
              </div>

              <div>
                <h3>Color Sliders</h3>
                <div class="checkbox-section">
                  <div class="checkbox-item">
                    <candor-checkbox
                      id="option-const-chroma"
                      name="Constant Chroma Toggle"
                      label="Constant chroma"
                      ?checked=${this.constantChroma}
                      @change=${this._toggleConstantChroma}
                    ></candor-checkbox>
                    <candor-tooltip text="About Constant chroma" position="left">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Constant chroma" @click=${() => (this.activeNoteModal = 'constantChroma')}>
                        ${this._INFO_SVG}
                      </candor-button>
                    </candor-tooltip>
                  </div>
                  <div class="checkbox-item">
                    <candor-checkbox
                      id="option-show-grad"
                      name="Show Gradient Toggle"
                      label="Show Gradient"
                      ?checked=${this.showGradient}
                      @change=${this._toggleShowGradient}
                    ></candor-checkbox>
                    <candor-tooltip text="About Show Gradient" position="left">
                      <candor-button variant="ghost" class="button--icon" aria-label="About Show Gradient" @click=${() => (this.activeNoteModal = 'showGradient')}>
                        ${this._INFO_SVG}
                      </candor-button>
                    </candor-tooltip>
                  </div>
                </div>
              </div>
            </candor-accordion-item>
          </candor-card>
        </div>

        <candor-card class="metadata" variant="elevated" padding="md">
          <h2 id="color-metadata">Color Metadata</h2>
          <candor-accordion-item heading="Descriptive data about your inputted colors." ?open=${true}>
            <cc-metadata
              colorone=${this.fgComparedColor}
              colortwo=${this.bgComparedColor}
              @note-requested=${this._handleNoteRequested}
            ></cc-metadata>
          </candor-accordion-item>
        </candor-card>

        <candor-card class="contact" variant="elevated" padding="md">
          <div class="contact__body">
            <h2>Contact Information and Feedback</h2>
            <p>
              Made by <a href="https://github.com/pawn002" aria-label="pawn002 on GitHub (external link)">pawn002</a>, who would appreciate
              <a href="https://github.com/pawn002/color-pair-quick-iterator/issues" aria-label="bug reports and feature requests for this app on GitHub (external link)">
                bug reports and feature requests for this app</a>
              to help improve its Accessibility.
            </p>
          </div>
        </candor-card>

        <candor-modal
          heading=${this.noteModalTitle}
          ?open=${this.activeNoteModal !== null}
          @close=${this._handleModalClose}
        >
          ${this.activeNoteModal === 'okca'
            ? html`<p>A WCAG-compatible ratio (1–21) in OKLCH color space. Unlike WCAG 2, OKCA is polarity-aware — light-on-dark and dark-on-light score differently, topping out at 20.9 and 20 respectively. Chroma compression reduces scores for saturated lighter colors (e.g. vivid pink on dark), addressing common WCAG false passes. Scores are always at or below the WCAG 2 equivalent — the 20.9 ceiling is what keeps that strict.</p>`
            : ''}
          ${this.activeNoteModal === 'apca'
            ? html`<p>Gauges inclusive contrast better than WCAG 2. For more information on why, refer to the Myndex article, <a href="https://git.apcacontrast.com/documentation/WhyAPCA.html">Why APCA?</a></p>`
            : ''}
          ${this.activeNoteModal === 'bpca'
            ? html`<p>A score compatible with use for WCAG 2.x success criteria. This score meets or exceeds WCAG 2 scores to better include those with atypical vision.</p>`
            : ''}
          ${this.activeNoteModal === 'apca object'
            ? html`<p>Displays the smallest pixel dimension the current contrast level supports, or <strong>!</strong> when contrast is too low for any object.</p>`
            : ''}
          ${this.activeNoteModal === 'deltaE'
            ? html`<p>A measure of the perceptual difference between two colors. Unlike contrast ratios, Delta E quantifies how different two colors appear regardless of their lightness relationship. Values range from 0 (identical) upward, where higher values indicate greater perceptual difference.</p>`
            : ''}
          ${this.activeNoteModal === 'wcag2'
            ? html`<p>This score is for reference only — do not use it for judging inclusive contrast.</p>`
            : ''}
          ${this.activeNoteModal === 'constantChroma'
            ? html`<p>Constrains sliders to tones that preserve your input color's chroma and hue. Disable to access a wider tonal range, though some generated tones may clash with your original color. When disabled, the Show Gradient option ranges from black to white.</p>`
            : ''}
          ${this.activeNoteModal === 'showGradient'
            ? html`<p>Renders a tone gradient behind the slider inputs. The gradient shows the tonal possibilities of your inputted color.</p>`
            : ''}
          ${this.activeNoteModal === 'accessibility'
            ? html`
                <p><span class="visual-header">Screen Reader Users:</span> Input a Foreground Color and a Background Color in the Main Color Controls section. Adjust colors lighter and darker using the sliders — the contrast score is announced automatically as you move them. Check full color descriptions and all contrast scores in the Color Metadata section, which is open by default.</p>
                <p><span class="visual-header">LCH Limits Grid:</span> Each color section has a collapsible LCH Limits accordion. Inside is a tone grid — navigate it with arrow keys, activate a tone with Enter or Space. Blank cells are outside the sRGB gamut. The selected tone is announced when activated.</p>
                <p><span class="visual-header">Low Vision Users:</span> Colors Contrast is designed to remain usable at high browser zoom — the contrast value, color inputs, sliders, and copy buttons stay visible.</p>
                <p><span class="visual-header">Random Color Pairs:</span> The app starts with a random passing pair. Use the sliders to generate tones for each contrast level you need, or swap foreground and background for a dark-mode variant.</p>
              `
            : ''}
        </candor-modal>

        <div class="alert">
          <cc-alert .alertMessage=${this.currentAlertMessage}></cc-alert>
        </div>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-app': CcApp;
  }
}
