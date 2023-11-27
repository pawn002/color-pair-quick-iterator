import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { ColorUtilService } from '../services/color-util.service';

export interface ResetObject {
  reset: true;
}

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
})
export class ColorSliderComponent implements OnInit, OnChanges {
  @Input() id: string | 'slider-0' = 'slider-0';
  @Input() name: string | 'color-slider' = 'color-slider';
  @Input() color: string | null = null;
  @Input() constantChroma: boolean = false;
  @Input() resetSlider: ResetObject | null = null;
  @Output() colorVariant = new EventEmitter<string | null>();

  debug: boolean = false;
  devColorVariant: string | null = null;

  slideInterval: number | null = null;
  slideMin: number | null = null;
  slideMax: number | null = null;
  initValue: number | null = null;
  value: number | null = null;

  getInitValue() {
    return this.initValue;
  }

  sendInitialLightVariant() {
    // Good UX to just send the input color?
    this.colorVariant.emit(this.color);

    if (this.debug) {
      this.devColorVariant = this.color;
    }
  }

  async getAndSetLightnessRange(
    color: string,
    options?: { constantChroma: boolean }
  ) {
    const rangeObject = await this.cus.getMinMaxLight(color);

    if (rangeObject) {
      this.sendInitialLightVariant();

      this.slideMin = 0;
      this.slideMax = 1;

      if (options?.constantChroma) {
        this.slideMin = rangeObject.lightMin;

        this.slideMax = rangeObject.lightMax;
      }

      this.slideInterval = (this.slideMax - this.slideMin) / 80;

      const lightnessIndex = 0;
      const initialSlideValue = rangeObject.originalCoords[lightnessIndex];

      this.initValue = initialSlideValue;

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

  reset() {
    // TODO: Isn't there an angular way to do this?
    const element = document.getElementById(this.id) as HTMLInputElement;

    if (this.initValue) {
      element.value = this.initValue.toString();
    } else {
      console.error(`trouble resetting slider`);
    }
  }

  constructor(private cus: ColorUtilService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.color) {
      this.getAndSetLightnessRange(this.color, {
        constantChroma: this.constantChroma,
      });
    } else {
      console.warn(`no color specified to comp`);
    }

    if (this.resetSlider) {
      this.reset();
    }
  }
}
