import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { COPY } from '../../icons';
import './copy-to-clipboard-button.component.scss';

@customElement('cc-copy-to-clipboard-button')
export class CcCopyToClipboardButton extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() color = '';
  @property() label = 'Copy to Clipboard';
  @property({ type: Boolean }) debug = false;

  private async copyToClipboard() {
    if (!this.color) {
      if (this.debug) console.warn('no color provided to copy');
      return;
    }

    const colorSansHex = this.color.replace('#', '');

    try {
      await navigator.clipboard.writeText(colorSansHex);
      this.dispatchEvent(
        new CustomEvent('copy-event', {
          detail: { copied: true, color: colorSansHex },
          bubbles: true,
          composed: true,
        }),
      );
      if (this.debug) console.log(this.color, 'copied to clipboard');
    } catch (err) {
      this.dispatchEvent(
        new CustomEvent('copy-event', {
          detail: { copied: false, color: colorSansHex },
          bubbles: true,
          composed: true,
        }),
      );
      console.error('Failed to copy text: ', err);
    }
  }

  override render() {
    return html`
      <div class="comp-container">
        <button aria-label=${this.label} ?disabled=${!this.color} @click=${this.copyToClipboard}>
          ${COPY}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-copy-to-clipboard-button': CcCopyToClipboardButton;
  }
}
