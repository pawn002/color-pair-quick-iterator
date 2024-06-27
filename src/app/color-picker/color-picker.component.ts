import {
  Component,
  effect,
  EventEmitter,
  input,
  model,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
})
export class ColorPickerComponent {
  inputId = input<string>('fg-color');
  inputName = input<string>('foreground color');
  color = input<string>('');

  comparedColor = model<string>('');

  @Output() selectedColor = new EventEmitter<string>();

  uiComparedColor: string = '';

  uiColor: string = '';

  handleColorChange(inputColor: string) {
    // update ui main color
    this.uiColor = inputColor;

    // send out color for use in other comps
    this.selectedColor.emit(inputColor);
  }

  handleInputEvent(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const selectedColor = inputElement.value;

    this.resetUiComparedColor();

    this.handleColorChange(selectedColor);
  }

  resetUiComparedColor() {
    this.uiComparedColor = 'transparent';
  }

  updateInputValue(color: string) {
    const targetInput = document.getElementById(
      this.inputId(),
    ) as HTMLInputElement;

    if (targetInput) {
      targetInput.value = color;
    } else {
      console.error(`something went wrong in color picker comp.`);
    }
  }

  constructor() {
    effect(() => {
      const comparedColor = this.comparedColor();

      this.uiComparedColor = comparedColor;
    });

    effect(() => {
      const colorFromParent = this.color();

      if (colorFromParent) {
        this.handleColorChange(colorFromParent);

        this.updateInputValue(colorFromParent);

        this.resetUiComparedColor();
      }
    });
  }
}
