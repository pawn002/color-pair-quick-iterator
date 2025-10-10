import { Component, Output, EventEmitter, input, output } from '@angular/core';

export class CopyToClipboardEvent {
  copied: boolean = false;
  color: string = '';
}

@Component({
  selector: 'app-copy-to-clipboard-button',
  templateUrl: './copy-to-clipboard-button.component.html',
  styleUrls: ['./copy-to-clipboard-button.component.scss'],
  standalone: true,
})
export class CopyToClipboardButtonComponent {
  color = input<string>('');
  debug = input<boolean>(true);

  copyEvent = output<CopyToClipboardEvent>();

  async copyToClipboard(): Promise<void> {
    const color = this.color();

    if (!color) {
      if (this.debug()) {
        console.warn('no color provided to copy');
      }

      return;
    }

    const colorSansHex = color.replace('#', '');

    try {
      await navigator.clipboard.writeText(colorSansHex);

      this.copyEvent.emit({
        copied: true,
        color: colorSansHex,
      });

      if (this.debug()) {
        console.log(color, 'copied to clipboard');
      }
    } catch (err) {
      this.copyEvent.emit({
        copied: false,
        color: colorSansHex,
      });

      console.error('Failed to copy text: ', err);
    }
  }
}
