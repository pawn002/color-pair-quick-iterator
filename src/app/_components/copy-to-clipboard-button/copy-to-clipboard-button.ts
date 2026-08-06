import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
          <div class="svg-container" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px">
              <path
                fill-rule="evenodd"
                d="M384,608 L384,624 L368,624 L368,608 L384,608 Z M370,622 L382,622 L382,610 L370,610 L370,622 Z M362,602 L362,614 L366,614 L366,616 L360,616 L360,600 L376,600 L376,606 L374,606 L374,602 L362,602 Z"
                transform="translate(-360 -600)"
              />
            </svg>
          </div>
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
