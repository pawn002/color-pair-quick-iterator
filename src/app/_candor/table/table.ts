import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './table.component.scss';

@customElement('cc-table')
export class CcTable extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property({ type: Boolean }) compact = false;

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add('table-host');
  }

  override updated() {
    this.classList.toggle('table-host--compact', this.compact);
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-table': CcTable;
  }
}
