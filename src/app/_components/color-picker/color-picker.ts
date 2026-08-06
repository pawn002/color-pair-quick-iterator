import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './color-picker.component.scss';

@customElement('cc-color-picker')
export class CcColorPicker extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ attribute: 'inputid' }) inputId = 'fg-color';
  @property({ attribute: 'inputname' }) inputName = 'foreground color';
  @property() label = 'Color';
  @property() color = '';
  @property({ attribute: 'comparedcolor' }) comparedColor = '';
  @property({ type: Boolean }) debug = false;

  @state() private uiColor = '';
  @state() private uiComparedColor = '';

  override updated(changed: Map<string, unknown>) {
    if (changed.has('color')) {
      this._handleColorChange(this.color);
      this._updateInputValue(this.color);
      this._resetUiComparedColor();
    }
    if (changed.has('comparedColor')) {
      this.uiComparedColor = this.comparedColor;
    }
  }

  private _handleColorChange(inputColor: string) {
    this.uiColor = inputColor;
    this.dispatchEvent(
      new CustomEvent('selected-color', { detail: inputColor, bubbles: true, composed: true }),
    );
  }

  private _handleInputEvent(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const selectedColor = inputElement.value;
    this._resetUiComparedColor();
    this._handleColorChange(selectedColor);
  }

  private _resetUiComparedColor() {
    this.uiComparedColor = 'transparent';
  }

  private _updateInputValue(color: string) {
    const targetInput = this.querySelector(`#${this.inputId}`) as HTMLInputElement;
    if (!targetInput) {
      if (this.debug) console.error(`no input found with id: ${this.inputId}`);
      return;
    }
    targetInput.value = color;
  }

  override render() {
    return html`
      <div class="comp-container">
        <label class="sr-only" for=${this.inputId}>${this.label}</label>
        <input
          type="color"
          id=${this.inputId}
          name=${this.inputName}
          @input=${this._handleInputEvent}
        />
        <div
          class="color-preview"
          style="border-color: ${this.uiComparedColor}; background-color: ${this.uiColor}"
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-color-picker': CcColorPicker;
  }
}
