import {
  Component,
  effect,
  EventEmitter,
  input,
  model,
  output,
  Output,
  signal,
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
  debug = input<boolean>(false);

  comparedColor = model<string>('');

  selectedColor = output<string>();

  uiComparedColor = signal<string>('');

  uiColor = signal<string>('');

  handleColorChange(inputColor: string) {
    // update ui main color
    this.uiColor.set(inputColor);

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
    this.uiComparedColor.set('transparent');
  }

  updateInputValue(color: string) {
    const targetInput = document.getElementById(this.inputId()) as HTMLInputElement;

    if (!targetInput) {
      if (this.debug()) {
        console.error(`no input found with id: ${this.inputId()}`);
      }

      return;
    }

    targetInput.value = color;
  }

  constructor() {
    effect(() => {
      const comparedColor = this.comparedColor();

      this.uiComparedColor.set(comparedColor);
    });

    effect(() => {
      const colorFromParent = this.color();

      this.handleColorChange(colorFromParent);

      this.updateInputValue(colorFromParent);

      this.resetUiComparedColor();
    });
  }
}
