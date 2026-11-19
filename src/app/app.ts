import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TooltipController } from './tooltip-controller';
import { colorUtil } from './services/color-util.service';
import type { ContrastType } from './services/color-metrics.service';
import type { TableColorCell } from './services/color-util.service';
import type { ResetObject } from './_components/color-slider/color-slider';
import type { AlertMessageObj } from './_components/alert/alert';
import {
  ARROW_COUNTER_CLOCKWISE,
  ARROWS_DOWN_UP,
  DICE_FIVE,
  DROP_HALF,
  INFO,
  PERSON_ARMS_SPREAD,
} from './icons';

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
  private readonly _tooltips = new TooltipController(this);

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

  override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has('activeNoteModal')) this._setPageScrollLock(this.activeNoteModal !== null);
  }

  // A modal that is torn down while open would otherwise leave the page locked.
  override disconnectedCallback() {
    this._setPageScrollLock(false);
    super.disconnectedCallback();
  }

  /**
   * Stop the page scrolling behind an open modal.
   *
   * `showModal()` puts the dialog in the top layer and makes everything behind
   * it inert, but inert does not mean unscrollable — that is per spec, and the
   * page keeps its own scrollport. Through Candor 5.x arrow keys reached the
   * page by two routes — initial focus on the close button, outside the
   * scrollable `.modal__body`, and overscroll chaining from that body — measured
   * at 79px of background travel per two presses.
   *
   * Candor 6.0 closed most of that (`pawn002/candor#265`): the body contains its
   * overscroll, and on open focus moves into the body *when it scrolls*. A note
   * short enough not to scroll still leaves focus on the close button, so arrow
   * keys there scroll the page, and wheel and touch reach the page regardless.
   * Locking the document covers all of it; the dialog is in the top layer, so
   * its own scrolling is unaffected.
   *
   * The padding compensates for the scrollbar the lock removes — without it the
   * page widens by its width (15px here) and everything jumps sideways as the
   * modal opens. `scrollbar-gutter: stable` does not help: the gutter is only
   * reserved while overflow is `auto` or `scroll`.
   *
   * Kept as a deliberate choice rather than a workaround: a page that does not
   * move behind a modal is what this app wants, whatever Candor does.
   */
  private _setPageScrollLock(locked: boolean) {
    const html = document.documentElement;
    if (locked) {
      // Measure before locking — afterwards the scrollbar is already gone.
      const gutter = window.innerWidth - html.clientWidth;
      html.style.paddingInlineEnd = `${gutter}px`;
      html.style.overflow = 'hidden';
    } else {
      html.style.overflow = '';
      html.style.paddingInlineEnd = '';
    }
  }

  override render() {
    return html`
      <a class="sr-only" href="#main-content">Skip to main content</a>
      <!-- tabindex="-1" so the skip link actually moves focus. Without it the
           fragment only sets Chrome's sequential-focus starting point, which
           puts the *next* Tab in the right place but leaves the virtual cursor
           where it was on AT that does not implement that behaviour. -->
      <main class="app-container" id="main-content" tabindex="-1">
        <div class="primary-stack">
          <!-- The sticky header below depends on the card clipping with
               overflow: clip, not hidden — see app.scss. -->
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
                <candor-button
                  variant="ghost"
                  size="small"
                  class="note-button"
                  @click=${() => (this.activeNoteModal = 'accessibility')}
                >
                  ${PERSON_ARMS_SPREAD} Screen reader and low vision workflows
                </candor-button>
              </candor-accordion-item>

              <h2 class="sr-only">Main Color Controls</h2>

              <h3>Foreground Color</h3>

              <div class="slide-group">
                ${this._tooltips.wrap(
                  'Choose foreground color',
                  html`
                  <cc-color-picker
                    inputid="cp-0"
                    inputname="Foreground Color"
                    label="Foreground Color"
                    comparedcolor=${this.fgComparedColor}
                    color=${this.fgColor}
                    @selected-color=${this._handleFgColorInput}
                  ></cc-color-picker>
                  `,
                  'right',
                )}
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
                ${this._tooltips.wrap(
                  'Copy foreground color',
                  html`
                  <cc-copy-to-clipboard-button
                    color=${this.fgComparedColor}
                    label="Copy foreground color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                  `,
                  'left',
                )}
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
                ${this._tooltips.wrap(
                  'Choose background color',
                  html`
                  <cc-color-picker
                    inputid="cp-1"
                    inputname="Background Color"
                    label="Background Color"
                    comparedcolor=${this.bgComparedColor}
                    color=${this.bgColor}
                    @selected-color=${this._handleBgColorInput}
                  ></cc-color-picker>
                  `,
                  'right',
                )}
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
                ${this._tooltips.wrap(
                  'Copy background color',
                  html`
                  <cc-copy-to-clipboard-button
                    color=${this.bgComparedColor}
                    label="Copy background color"
                    @copy-event=${this._handleCopyEvent}
                  ></cc-copy-to-clipboard-button>
                  `,
                  'left',
                )}
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
              ${this._tooltips.wrap(
                'Swap foreground and background',
                html`
                <candor-button
                  variant="tertiary"
                  class="button--icon"
                  aria-label="Swap Selected Colors"
                  ?disabled=${!this.fgColor || !this.bgColor}
                  @click=${this._swapColors}
                >
                  ${ARROWS_DOWN_UP}
                </candor-button>
                `,
              )}

              ${this._tooltips.wrap(
                'Match chromas',
                html`
                <candor-button variant="tertiary" class="button--icon" aria-label="Harmonize Color Pair To Same Chroma" @click=${this._matchChromas}>
                  ${DROP_HALF}
                </candor-button>
                `,
              )}

              ${this._tooltips.wrap(
                'Reset sliders',
                html`
                <candor-button variant="tertiary" class="button--icon" aria-label="Reset Color Sliders" @click=${this._resetSliders}>
                  ${ARROW_COUNTER_CLOCKWISE}
                </candor-button>
                `,
              )}

              ${this._tooltips.wrap(
                'New random pair',
                html`
                <candor-button variant="tertiary" class="button--icon" aria-label="Create Random Color Pair" @click=${() => this._setRandomColorPair()}>
                  ${DICE_FIVE}
                </candor-button>
                `,
              )}
            </div>
          </candor-card>

          <candor-card class="options" variant="elevated" padding="md">
            <h2>Options</h2>

            <candor-accordion-item heading="Change how Colors Contrast works.">
              <!-- fieldset + legend is Candor's documented pattern for a radio group,
                   and the legend gives each option its question context for screen
                   readers. Nothing else goes in these rows: the per-option "About"
                   buttons live on the matching rows of cc-metadata, which is where the
                   value each one explains is actually shown. Keeping them out of here
                   is what makes the group a contiguous run of radios. -->
              <fieldset class="radio-fieldset">
                <legend>Colors Contrast Value</legend>
                <div class="radio-section">
                  ${(
                    [
                      ['okca', 'OKCA'],
                      ['apca', 'Perceptual'],
                      ['bpca', 'WCAG 2 compatible'],
                      ['apca object', 'Object'],
                      ['deltaE', 'Delta E'],
                    ] as const
                  ).map(
                    ([type, label]) => html`
                      <candor-radio
                        name="contrastType"
                        value=${type}
                        label=${label}
                        ?checked=${this.contrastType === type}
                        @change=${this._handleContrastTypeChange}
                      ></candor-radio>
                    `,
                  )}
                </div>
                <candor-text class="radio-group-note" variant="caption" size="sm" color="secondary">
                  Info buttons in Color Metadata explain what each value measures.
                </candor-text>
              </fieldset>

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
                    ${this._tooltips.wrap(
                      'About Constant chroma',
                      html`
                      <candor-button variant="ghost" class="button--icon" aria-label="About Constant chroma" @click=${() => (this.activeNoteModal = 'constantChroma')}>
                        ${INFO}
                      </candor-button>
                      `,
                      'left',
                    )}
                  </div>
                  <div class="checkbox-item">
                    <candor-checkbox
                      id="option-show-grad"
                      name="Show Gradient Toggle"
                      label="Show Gradient"
                      ?checked=${this.showGradient}
                      @change=${this._toggleShowGradient}
                    ></candor-checkbox>
                    ${this._tooltips.wrap(
                      'About Show Gradient',
                      html`
                      <candor-button variant="ghost" class="button--icon" aria-label="About Show Gradient" @click=${() => (this.activeNoteModal = 'showGradient')}>
                        ${INFO}
                      </candor-button>
                      `,
                      'left',
                    )}
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
            ? html`<p>A WCAG-compatible ratio (1–21) in OKLCH color space. Both directions top out at 20.9 and score alike, except on dark backgrounds (darker than #767676), where light-on-dark scores a little lower — a darker surround flattens perceived lightness. A hue-weighted chroma penalty reduces scores for saturated colors, strongest for reds and magentas (e.g. vivid pink on dark), addressing common WCAG false passes. Scores are always below the WCAG 2 equivalent — the 20.9 ceiling is what keeps that strict.</p>`
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

      </main>

      <!-- Outside <main>, and that placement is load-bearing. cc-alert renders a
           candor-toast-container, which is position: fixed — but .app-container
           centres itself with translateX(-50%), and a transformed ancestor
           becomes the containing block for fixed descendants. Inside main the
           toast pinned to the bottom of the *document* instead of the viewport,
           1379px below the fold. The old wrapper used position: sticky, which is
           why this never came up before. -->
      <cc-alert .alertMessage=${this.currentAlertMessage}></cc-alert>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-app': CcApp;
  }
}
