import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
  input,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent implements ControlValueAccessor {
  label = input<string>();
  value = input<unknown>();
  name = input<string>();
  id = input<string>();

  @Input() checked = false;
  @Input() disabled = false;
  selectedValue: unknown;

  changed = output<unknown>();

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};
  private cdr = inject(ChangeDetectorRef);
  private _generatedId = `radio-${Math.random().toString(36).substr(2, 9)}`;

  writeValue(value: unknown): void {
    this.selectedValue = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedValue = this.value();
      this.onChange(this.selectedValue);
      this.changed.emit(this.value());
    }
  }

  onBlur(): void {
    this.onTouched();
  }

  get isChecked(): boolean {
    return this.selectedValue === this.value();
  }

  get radioId(): string {
    return this.id() || this._generatedId;
  }
}
