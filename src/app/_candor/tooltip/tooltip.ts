import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import './tooltip.component.scss';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@customElement('candor-tooltip')
export class CandorTooltip extends LitElement {
  override createRenderRoot(): this {
    return this;
  }

  @property() text = '';
  @property() position: TooltipPosition = 'top';

  @state() private visible = false;
  @state() private nudgeX = 0;

  @query('.tooltip__bubble') private bubble?: HTMLDivElement;

  private show() {
    this.nudgeX = 0;
    this.visible = true;
    queueMicrotask(() => {
      if (!this.bubble) return;
      const { left, right } = this.bubble.getBoundingClientRect();
      const margin = 8;
      const vw = window.innerWidth;
      if (left < margin) this.nudgeX = margin - left;
      else if (right > vw - margin) this.nudgeX = vw - margin - right;
    });
  }

  private hide() {
    this.visible = false;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', () => this.show());
    this.addEventListener('mouseleave', () => this.hide());
    this.addEventListener('focusin', () => this.show());
    this.addEventListener('focusout', () => this.hide());
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') this.hide();
    });
    this.classList.add('tooltip');
  }

  override render() {
    return html`
      <slot></slot>
      <div
        aria-hidden="true"
        class=${'tooltip__bubble tooltip__bubble--' +
          this.position +
          (this.visible ? ' tooltip__bubble--visible' : '')}
        style="--nudge-x: ${this.nudgeX}px"
      >
        ${this.text}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'candor-tooltip': CandorTooltip;
  }
}
