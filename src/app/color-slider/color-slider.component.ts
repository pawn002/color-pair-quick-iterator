import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { ColorUtilService } from '../color-util.service';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements OnInit, OnChanges {
  @Input() color: string | null = null;
  @Input() id: string | 'slider-0' = 'slider-0';
  @Input() name: 'string' | 'color-slider' = 'color-slider';
  @Output() colorVariant = new EventEmitter<string | null>();

  debug: boolean = true;
  devColorVariant: string | null = null;

  slideInterval: number | null = 0.001;
  slideMin: number | null = null;
  slideMax: number | null = null;
  value: number | null = null;

  sendInitialLightVariant() {
    // Good UX to just send the input color?
    this.colorVariant.emit(this.color);

    if (this.debug) {
      this.devColorVariant = this.color;
    }
  }

  async getAndSetLightnessRange(color: string) {
    const rangeObject = await this.cus.getMinMaxLight(color);

    if (rangeObject) {
      this.sendInitialLightVariant();

      this.slideMin = rangeObject.lightMin;
      this.slideMax = rangeObject.lightMax;

      const lightnessValue = 0;
      const initialSlideValue = rangeObject.originalCoords[lightnessValue];

      this.value = initialSlideValue;
    } else {
      console.error(`no range object for slider`);
    }
  }

  handleSliding(event: Event) {
    const inputElem = event.target as HTMLInputElement;

    if (inputElem) {
      const lightValue = parseFloat(inputElem.value);

      if (this.color) {
        const lightnessVariant = this.cus.createSrgbColor(
          this.color,
          lightValue
        );

        if (this.debug) {
          console.log(`slide modding ${this.color} to ${lightnessVariant}`);

          this.devColorVariant = lightnessVariant;
        }

        this.colorVariant.emit(lightnessVariant);
      } else {
        console.error(`no color specified`);
      }
    }
  }

  constructor(private cus: ColorUtilService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.color) {
      this.getAndSetLightnessRange(this.color);
    } else {
      console.error(`no color specified to comp`);
    }
  }
}
