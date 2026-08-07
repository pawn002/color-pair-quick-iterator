import { LitElement, html, type PropertyValues } from 'lit';
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

  override updated(changed: PropertyValues) {
    super.updated(changed);
    void this._applyRovingTabIndex();
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
   * page keeps its own scrollport. So arrow keys reached the page instead of the
   * note, by two separate routes:
   *
   * 1. `candor-modal` focuses its close button on open, which sits in the header
   *    and so is outside `.modal__body` — the scrollable region. The very first
   *    arrow key went to the page, before the reader had touched anything.
   * 2. Even with focus in the body, `overscroll-behavior` there is `auto`, so
   *    reaching either end chained the remaining scroll to the page.
   *
   * Both measured at 79px of background travel per two presses. Locking the
   * document closes both, and covers wheel and touch as well; the dialog is in
   * the top layer, so its own scrolling is unaffected.
   *
   * The padding compensates for the scrollbar the lock removes — without it the
   * page widens by its width (15px here) and everything jumps sideways as the
   * modal opens. `scrollbar-gutter: stable` does not help: the gutter is only
   * reserved while overflow is `auto` or `scroll`.
   *
   * Both routes are `candor-modal`'s to fix — initial focus belongs in the
   * scrollable region, which already carries `tabindex="0"`, and that region
   * wants `overscroll-behavior: contain`. Upstream as `pawn002/candor#265`;
   * this stays until that lands.
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

  /**
   * Make the contrast-type radios a single tab stop.
   *
   * A radio group is one tab stop, with arrows moving between options — native
   * behaviour, and what the ARIA APG specifies. `candor-radio` implements the
   * arrow half but leaves `tabindex="0"` on every option's inner input, so the
   * five options cost five tab stops. This supplies the missing half: only the
   * selected option is tabbable, so Tab enters the group at the current choice
   * and leaves it in one press.
   *
   * Reaching through another element's shadow root is not something to do
   * lightly, and it is the reason this is a handful of lines rather than one
   * attribute — there is no `::part` or property for the inner input. Delete it
   * when `pawn002/candor#262` lands; the spec below fails when that happens.
   */
  private async _applyRovingTabIndex() {
    const radios = Array.from(
      this.querySelectorAll<HTMLElement & { updateComplete?: Promise<unknown>; value?: string }>(
        'candor-radio[name="contrastType"]',
      ),
    );
    if (!radios.length) return;

    // The inner input only exists once each element has rendered its shadow root.
    await Promise.all(radios.map((radio) => radio.updateComplete ?? Promise.resolve()));

    // Fall back to the first option so the group stays reachable if nothing is
    // selected — a group with every option at -1 is unreachable by keyboard.
    const selected = radios.findIndex((radio) => radio.getAttribute('value') === this.contrastType);
    const tabbable = selected === -1 ? 0 : selected;

    radios.forEach((radio, index) => {
      const input = radio.shadowRoot?.querySelector('input');
      if (input) input.tabIndex = index === tabbable ? 0 : -1;
    });
  }

  private readonly _INFO_SVG = html`
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  `;

  /**
   * Phosphor `PersonArmsSpread` (fill), inlined from `@phosphor-icons/core`.
   *
   * Candor stipulates Phosphor, and its own components inline the path data the
   * same way — the font-class route does not cross a shadow boundary (candor#171).
   * Inlining is the permanent pattern, not a stopgap: the `ph*` constants in the
   * package's `icons.d.ts` are Candor's own chrome and are deliberately not
   * exported, so there is nothing to import here (candor#260).
   */
  private readonly _ACCESSIBILITY_SVG = html`
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
      <path
        d="M100,36a28,28,0,1,1,28,28A28,28,0,0,1,100,36ZM227.6,92.57A15.7,15.7,0,0,0,212,80H44a16,16,0,0,0-6.7,30.53l.06,0,53.89,23.73-21.92,83.3a16,16,0,0,0,7.9,20.91A15.83,15.83,0,0,0,84,240a16,16,0,0,0,14.44-9.06L128,180l29.58,51a16,16,0,0,0,29.07-13.35l-21.92-83.3,54-23.76A15.7,15.7,0,0,0,227.6,92.57Z"
      />
    </svg>
  `;

  override render() {
    return html`
      <a class="sr-only" href="#main-content">Skip to main content</a>
      <main class="app-container" id="main-content">
        <div class="primary-stack">
          <!-- Not a candor-card: the card sets overflow: hidden, which makes it a
               scroll container, and a position: sticky descendant is constrained
               to its nearest scrollport — so the header below stuck to the card,
               which scrolls away with the page, rather than to the viewport.
               See app.scss. -->
          <div class="title-and-sliders">
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
                  ${this._ACCESSIBILITY_SVG} Screen reader and low vision workflows
                </candor-button>
              </candor-accordion-item>

              <h2 class="sr-only">Main Color Controls</h2>

              <h3>Foreground Color</h3>

              <div class="slide-group">
                <candor-tooltip text="Choose foreground color" position="right">
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
                <candor-tooltip text="Copy foreground color" position="left">
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
                <candor-tooltip text="Choose background color" position="right">
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
                <candor-tooltip text="Copy background color" position="left">
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
          </div>

          <!-- Not a candor-card: the card clips these tooltips. See app.scss. -->
          <div class="quick-actions">
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
          </div>

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
