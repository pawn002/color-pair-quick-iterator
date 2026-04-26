import { ChangeDetectionStrategy, Component, ElementRef, HostListener, input, signal, viewChild } from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

// Tooltips in Candor are intentionally hidden from assistive technology.
// They are a visual affordance for pointer/sighted users only.
// The trigger element — button, link, or input — must be self-describing
// via its accessible name and label. Tooltips are a last resort for
// supplementary context that would otherwise require a persistent label.
@Component({
  selector: 'app-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    <div
      #bubble
      aria-hidden="true"
      [class]="'tooltip__bubble tooltip__bubble--' + position()"
      [class.tooltip__bubble--visible]="visible()"
      [style.--nudge-x.px]="nudgeX()"
    >
      {{ text() }}
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
  host: {
    class: 'tooltip',
  },
})
export class TooltipComponent {
  text = input('');
  position = input<TooltipPosition>('top');

  protected visible = signal(false);
  protected nudgeX = signal(0);

  private bubble = viewChild<ElementRef<HTMLDivElement>>('bubble');

  private show(): void {
    this.nudgeX.set(0);
    this.visible.set(true);
    queueMicrotask(() => {
      const el = this.bubble()?.nativeElement;
      if (!el) return;
      const { left, right } = el.getBoundingClientRect();
      const margin = 8;
      const vw = window.innerWidth;
      if (left < margin) this.nudgeX.set(margin - left);
      else if (right > vw - margin) this.nudgeX.set(vw - margin - right);
    });
  }

  private hide(): void {
    this.visible.set(false);
  }

  @HostListener('mouseenter') onMouseEnter(): void { this.show(); }
  @HostListener('mouseleave') onMouseLeave(): void { this.hide(); }
  @HostListener('focusin') onFocusIn(): void { this.show(); }
  @HostListener('focusout') onFocusOut(): void { this.hide(); }
  @HostListener('keydown.escape') onEscape(): void { this.hide(); }
}
