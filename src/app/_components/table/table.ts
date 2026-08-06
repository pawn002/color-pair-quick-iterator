import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './table.component.scss';

/**
 * Styling wrapper around an authored `<table>`.
 *
 * This is deliberately not `candor-table`. The upstream element is data-driven
 * (`headers: string[]`, `rows: { cells: string[] }[]`), and half the tables in
 * cc-metadata put an interactive tooltip and info button inside a cell — there
 * is nowhere in that API to put one. So the app keeps a light-DOM wrapper that
 * styles whatever markup it is given, and the two components solve different
 * problems rather than one being a worse copy of the other.
 */
@customElement('cc-table')
export class CcTable extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  /** Reflected so the stylesheet can select on it without a class hook. */
  @property({ type: Boolean, reflect: true }) compact = false;

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cc-table': CcTable;
  }
}
