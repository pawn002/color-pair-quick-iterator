import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-to-clipboard-button',
  templateUrl: './copy-to-clipboard-button.component.html',
  styleUrls: ['./copy-to-clipboard-button.component.scss'],
})
export class CopyToClipboardButtonComponent {
  @Input() color: string | null = null;

  async copyToClipboard(): Promise<void> {
    if (this.color) {
      try {
        await navigator.clipboard.writeText(this.color);

        console.log(this.color, 'copied to clipboard');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    } else {
      console.error('nothing to copy');
    }
  }
}
