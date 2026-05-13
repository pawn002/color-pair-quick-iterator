import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './checkbox.component.scss';

@customElement('candor-checkbox')
export class CandorCheckbox extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() label?: string;
  @property({ attribute: 'input-id' }) inputId?: string;
  @property({ type: Boolean }) required = false;
  @property() name?: string;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;

  private _generatedId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  get checkboxId() {
    return this.inputId || this.getAttribute('id') || this._generatedId;
  }

  private onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(
      new CustomEvent('changed', { detail: this.checked, bubbles: true, composed: true }),
    );
  }

  override render() {
    return html`
      <label
        for=${this.checkboxId}
        class=${'checkbox-wrapper' + (this.disabled ? ' checkbox-wrapper--disabled' : '')}
      >
        <input
          type="checkbox"
          id=${this.checkboxId}
          name=${this.name ?? ''}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          class="checkbox-input"
          @change=${this.onCheckboxChange}
        />
        <span class="checkbox-box"></span>
        <span class="checkbox-label">${this.label}</span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'candor-checkbox': CandorCheckbox;
  }
}
