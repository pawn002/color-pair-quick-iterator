import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() showAlert: boolean = false;
  @Input() alertMessage: string | null = null;
  @Output() alertClosed = new EventEmitter<boolean>();

  hideAlert() {
    this.showAlert = false;

    this.alertClosed.emit(true);
  }
}
