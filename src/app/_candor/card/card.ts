import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './card.component.scss';

type CardVariant = 'default' | 'elevated' | 'outlined';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

@customElement('candor-card')
export class CandorCard extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() variant: CardVariant = 'default';
  @property() padding: CardPadding = 'md';

  override render() {
    return html`
      <div class=${'card card--' + this.variant + ' card--padding-' + this.padding}>
        <div class="card__header">
          <slot name="header"></slot>
        </div>
        <div class="card__body">
          <slot></slot>
        </div>
        <div class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'candor-card': CandorCard;
  }
}
