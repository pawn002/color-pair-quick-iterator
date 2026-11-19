import { html, nothing, type ReactiveController, type ReactiveControllerHost, type TemplateResult } from 'lit';

/**
 * The width at which the app has room for tooltips — the same breakpoint
 * `app.scss` uses to go from one column to two. Below it is the mobile layout.
 */
export const TOOLTIP_MEDIA_QUERY = '(min-width: 900px)';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Renders tooltips only at desktop widths.
 *
 * Why not just hide them: `candor-tooltip` opens on `mouseenter` and on focus,
 * and a tap fires both, so on a phone a tapped button keeps its bubble until
 * the next tap somewhere else — over the very controls being used. The element
 * has no property, `::part` or custom property to switch that off, and the
 * bubble is a popover inside its shadow root, so no stylesheet here can reach
 * it. Leaving the wrapper out is the only off switch.
 *
 * Nothing is lost to assistive tech: the bubble is `aria-hidden`, and every
 * control it wraps carries its own accessible name.
 *
 * Without `matchMedia` (jsdom) tooltips are kept, so component tests see the
 * desktop markup.
 */
export class TooltipController implements ReactiveController {
  /** Whether tooltips render right now. */
  enabled = true;

  private _query?: MediaQueryList;

  constructor(private readonly host: ReactiveControllerHost) {
    host.addController(this);
  }

  hostConnected(): void {
    if (typeof window.matchMedia !== 'function') return;
    this._query = window.matchMedia(TOOLTIP_MEDIA_QUERY);
    // Read before the host's first render, so a phone never flashes them.
    this.enabled = this._query.matches;
    this._query.addEventListener('change', this._onChange);
  }

  hostDisconnected(): void {
    this._query?.removeEventListener('change', this._onChange);
    this._query = undefined;
  }

  private readonly _onChange = (event: MediaQueryListEvent) => {
    this.enabled = event.matches;
    this.host.requestUpdate();
  };

  /** `content` inside a `candor-tooltip` at desktop widths, bare otherwise. */
  wrap(text: string, content: TemplateResult, position?: TooltipPosition): TemplateResult {
    return this.enabled
      ? html`<candor-tooltip text=${text} position=${position ?? nothing}>${content}</candor-tooltip>`
      : content;
  }
}
