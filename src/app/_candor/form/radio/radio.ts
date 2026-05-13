import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './radio.component.scss';

@customElement('candor-radio')
export class CandorRadio extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() label?: string;
  @property() value?: string;
  @property() name?: string;
  @property({ attribute: 'input-id' }) inputId?: string;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  private _generatedId = `radio-${Math.random().toString(36).substr(2, 9)}`;

  get radioId() {
    return this.inputId || this.getAttribute('id') || this._generatedId;
  }

  private onRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.dispatchEvent(
        new CustomEvent('changed', { detail: this.value, bubbles: true, composed: true }),
      );
    }
  }

  override render() {
    return html`
      <label
        for=${this.radioId}
        class=${'radio-wrapper' + (this.disabled ? ' radio-wrapper--disabled' : '')}
      >
        <input
          type="radio"
          id=${this.radioId}
          name=${this.name ?? ''}
          value=${this.value ?? ''}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          class="radio-input"
          @change=${this.onRadioChange}
        />
        <span class="radio-circle"></span>
        <span class="radio-label">${this.label}</span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'candor-radio': CandorRadio;
  }
}
