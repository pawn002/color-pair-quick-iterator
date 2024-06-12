import {
  Component,
  effect,
  EventEmitter,
  Input,
  input,
  model,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
})
export class ColorPickerComponent {
  inputId = input('fg-color');
  inputName = input('foreground color');
  deltaColor = input<string | null>(null);

  @Output() selectedColor = new EventEmitter<string>();

  comparedColor = model<string | null>(null);

  uiComparedColor: string | null = null;

  color: string | null = null;

  handleColorChange(inputColor: string) {
    // update color
    this.color = inputColor;

    // send out color for use in other comps
    this.selectedColor.emit(inputColor);
  }

  handleInputEvent(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const selectedColor = inputElement.value;

    this.resetComparedColor();

    this.handleColorChange(selectedColor);
  }

  resetComparedColor() {
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
      this.uiComparedColor = this.comparedColor();
    });

    effect(() => {
      const colorFromParent = this.deltaColor();

      if (colorFromParent) {
        this.handleColorChange(colorFromParent);

        this.updateInputValue(colorFromParent);

        this.resetComparedColor();
      }
    });
  }
}
