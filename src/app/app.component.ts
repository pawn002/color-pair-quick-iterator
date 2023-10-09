import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  colorPickerOneSelectedColor: string | null = null;
  colorPickerOneComparedColor: string | null = null;

  colorPickerTwoSelectedColor: string | null = null;
  colorPickerTwoComparedColor: string | null = null;

  handleColorInputInput(inputNumber: 'One' | 'Two', event: string) {
    if (inputNumber === 'One') {
      this.colorPickerOneSelectedColor = event;
    }

    if (inputNumber === 'Two') {
      this.colorPickerTwoSelectedColor = event;
    }
  }

  handleSliderInputInput(inputNumber: 'One' | 'Two', event: string | null) {
    if (inputNumber === 'One') {
      this.colorPickerOneComparedColor = event;
    }

    if (inputNumber === 'Two') {
      this.colorPickerTwoComparedColor = event;
    }
  }
}
