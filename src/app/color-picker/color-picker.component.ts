import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnChanges {
  @Input() inputId: string = 'fg-color';
  @Input() inputName: string = 'foreground color';
  @Input() comparedColor: string | null = null;
  @Input() deltaColor?: string | null = null;

  @Output() selectedColor = new EventEmitter<string>();

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

    // reset compared color
    this.comparedColor = 'transparent';

    this.handleColorChange(selectedColor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.deltaColor) {
      this.handleColorChange(this.deltaColor);
    }
  }
}
