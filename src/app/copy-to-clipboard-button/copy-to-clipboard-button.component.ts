import { Component, Input, Output, EventEmitter } from '@angular/core';

export class CopyToClipboardEvent {
  copied: boolean = false;
  color: string | null = null;
}

@Component({
  selector: 'app-copy-to-clipboard-button',
  templateUrl: './copy-to-clipboard-button.component.html',
  styleUrls: ['./copy-to-clipboard-button.component.scss'],
  standalone: true,
})
export class CopyToClipboardButtonComponent {
  @Input() color: string | null = null;
  @Output() copyEvent = new EventEmitter<CopyToClipboardEvent>();

  async copyToClipboard(): Promise<void> {
    if (this.color) {
      const colorSansHex = this.color.replace('#', '');

      try {
        await navigator.clipboard.writeText(colorSansHex);

        this.copyEvent.emit({
          copied: true,
          color: colorSansHex,
        });

        // console.log(this.color, 'copied to clipboard');
      } catch (err) {
        this.copyEvent.emit({
          copied: false,
          color: colorSansHex,
        });

        console.error('Failed to copy text: ', err);
      }
    } else {
      console.error('nothing to copy');
    }
  }
}
