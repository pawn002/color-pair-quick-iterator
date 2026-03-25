import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  host: {
    // Prevent the `title` input from leaking as a native HTML tooltip attribute
    '[attr.title]': 'null',
  },
})
export class AccordionItemComponent {
  title = input('');
  open = input(false);
  variant = input<'default' | 'subtle' | 'quiet'>('default');
}
