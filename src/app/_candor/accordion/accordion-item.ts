import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './accordion-item.component.scss';

@customElement('candor-accordion-item')
export class CandorAccordionItem extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() override title = '';
  @property({ type: Boolean }) open = false;
  @property() variant: 'default' | 'subtle' | 'quiet' = 'default';

  override render() {
    return html`
      <details class="accordion-item" ?open=${this.open}>
        <summary class="accordion-item__summary">
          <span class=${'accordion-item__title accordion-item__title--' + this.variant}>
            ${this.title}
          </span>
          <svg
            class="accordion-item__chevron"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div class="accordion-item__panel">
          <div class="accordion-item__content">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'candor-accordion-item': CandorAccordionItem;
  }
}
