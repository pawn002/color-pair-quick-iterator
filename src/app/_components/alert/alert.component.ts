import { Component, input, effect, signal, output } from '@angular/core';
import { random, times } from 'lodash-es';
import { ToastComponent } from '../../_candor/toast/toast.component';

export class AlertMessagObj {
  message: string = '';
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [ToastComponent],
})
export class AlertComponent {
  alertMessage = input<AlertMessagObj>(new AlertMessagObj());

  alertClosed = output<boolean>();

  showAlert = signal<boolean>(false);
  uniqId = signal<string>('');

  timeout: number = NaN;

  generateRandomString(length: number) {
    return times(length, () => random(35).toString(36)).join('');
  }

  hideAlert() {
    this.showAlert.set(false);

    this.uniqId.set('');

    this.alertClosed.emit(true);
  }

  constructor() {
    effect(() => {
      const alertMessage = this.alertMessage();

      if (alertMessage.message) {
        this.uniqId.set(this.generateRandomString(12));

        this.showAlert.set(true);

        if (this.timeout) {
          clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
          this.showAlert.set(false);
        }, 5000) as unknown as number;
      }
    });
  }
}
