import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @Input() inputId: string = 'fg-color';
  @Input() inputName: string = 'foreground color';
  @Input() comparedColor: string | null = null;
  @Output() selectedColor = new EventEmitter<string>();

  color: string | null = null;

  handleInputEvent(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const selectedColor = inputElement.value;

    // update color
    this.color = selectedColor;

    // reset compared color
    this.comparedColor = 'transparent';

    // send out color for use in other comps
    this.selectedColor.emit(selectedColor);
  }
}
