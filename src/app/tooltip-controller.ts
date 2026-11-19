import { html, nothing, type ReactiveController, type ReactiveControllerHost, type TemplateResult } from 'lit';

/**
 * A phone, in either orientation — the only place tooltips are left out.
 *
 * Width alone cannot tell a phone from a tablet: a phone in landscape is
 * 844–932px wide, wider than a portrait iPad (744–834px). What separates them
 * is the short side — under 600px on a phone, 744px and up on a tablet. So:
 * narrower than 600px, or shorter than 600px on a touch screen. The touch
 * condition keeps a short desktop window from losing its tooltips.
 */
export const PHONE_MEDIA_QUERY =
  '(max-width: 599.98px), (max-height: 599.98px) and (pointer: coarse)';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Renders tooltips everywhere except on phones.
 *
 * Why not just hide them: `candor-tooltip` opens on `mouseenter` and on focus,
 * and a tap fires both, so a tapped button keeps its bubble until the next tap
 * somewhere else — over the very controls being used, which on a phone-sized
 * screen is most of them. The element has no property, `::part` or custom
 * property to switch that off, and the bubble is a popover inside its shadow
 * root, so no stylesheet here can reach it. Leaving the wrapper out is the only
 * off switch. Tablets keep their tooltips by choice: there is room for the
 * bubble beside what it covers.
 *
 * Nothing is lost to assistive tech: the bubble is `aria-hidden`, and every
 * control it wraps carries its own accessible name.
 *
 * Without `matchMedia` (jsdom) tooltips are kept, so component tests see the
 * full markup.
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
    this._query = window.matchMedia(PHONE_MEDIA_QUERY);
    // Read before the host's first render, so a phone never flashes them.
    this.enabled = !this._query.matches;
    this._query.addEventListener('change', this._onChange);
  }

  hostDisconnected(): void {
    this._query?.removeEventListener('change', this._onChange);
    this._query = undefined;
  }

  private readonly _onChange = (event: MediaQueryListEvent) => {
    this.enabled = !event.matches;
    this.host.requestUpdate();
  };

  /** `content` inside a `candor-tooltip`, or bare on a phone. */
  wrap(text: string, content: TemplateResult, position?: TooltipPosition): TemplateResult {
    return this.enabled
      ? html`<candor-tooltip text=${text} position=${position ?? nothing}>${content}</candor-tooltip>`
      : content;
  }
}
