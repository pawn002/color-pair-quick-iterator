import { Component, Input, Output, EventEmitter } from '@angular/core';

export class CopyToClipboardEvent {
  copied: boolean = false;
  color: string | null = null;
}

@Component({
  selector: 'app-copy-to-clipboard-button',
  templateUrl: './copy-to-clipboard-button.component.html',
  styleUrls: ['./copy-to-clipboard-button.component.scss'],
})
export class CopyToClipboardButtonComponent {
  @Input() color: string | null = null;
  @Output() copyEvent = new EventEmitter<CopyToClipboardEvent>();

  async copyToClipboard(): Promise<void> {
    if (this.color) {
      try {
        await navigator.clipboard.writeText(this.color);

        this.copyEvent.emit({
          copied: true,
          color: this.color,
        });

        console.log(this.color, 'copied to clipboard');
      } catch (err) {
        this.copyEvent.emit({
          copied: false,
          color: this.color,
        });

        console.error('Failed to copy text: ', err);
      }
    } else {
      console.error('nothing to copy');
    }
  }
}
