import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { random } from 'lodash';

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

  hideAlert() {
    this.showAlert = false;

    this.alertClosed.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`new obj!`);

    this.showAlert = true;
  }

  ngOnInit(): void {
    this.showAlert = false;
  }
}
