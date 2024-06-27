import { Component, EventEmitter, input, effect, Output } from '@angular/core';
import { random, times } from 'lodash';

export class AlertMessagObj {
  message: string = '';
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone: true,
})
export class AlertComponent {
  alertMessage = input<AlertMessagObj>(new AlertMessagObj());

  @Output() alertClosed = new EventEmitter<boolean>();

  showAlert: boolean = false;

  uniqId: string = '';

  timeout: number = NaN;

  generateRandomString(length: number) {
    return times(length, () => random(35).toString(36)).join('');
  }

  hideAlert() {
    this.showAlert = false;

    this.uniqId = '';

    this.alertClosed.emit(true);
  }

  constructor() {
    effect(() => {
      const alertMessage = this.alertMessage();

      if (alertMessage.message) {
        this.uniqId = this.generateRandomString(12);

        this.showAlert = true;

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.showAlert = false;
        }, 5000) as unknown as number;
      }
    });
  }
}
