import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './button.component.scss';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
type ButtonSize = 'small' | 'medium' | 'large' | 'icon';

@customElement('cc-button')
export class CcButton extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() variant: ButtonVariant = 'primary';
  @property() size: ButtonSize = 'medium';
  @property({ type: Boolean }) disabled = false;
  @property() type: 'button' | 'submit' | 'reset' = 'button';
  @property({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

  private onClick(event: Event) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('clicked', { detail: event, bubbles: true, composed: true }));
    }
  }

  override render() {
    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? nothing}
        class=${'button button--' + this.variant + ' button--' + this.size}
        @click=${this.onClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-button': CcButton;
  }
}
