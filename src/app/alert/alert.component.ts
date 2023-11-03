import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { random, sample, times } from 'lodash';

export interface AlertMessagObj {
  message: string;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() alertMessage: AlertMessagObj | null = null;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.uniqId = this.generateRandomString(12);

    this.showAlert = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.showAlert = false;
    }, 5000) as unknown as number;
  }

  ngOnInit(): void {
    this.showAlert = false;
  }
}
