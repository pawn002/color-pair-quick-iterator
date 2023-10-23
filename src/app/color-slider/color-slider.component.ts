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
  @Output() colorVariant = new EventEmitter<string | null>();

  debug: boolean = false;
  devColorVariant: string | null = null;

  // slideInterval: number | null = 0.001;
  slideInterval: number | null = 0.005;
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

      const lightnessIndex = 0;
      const initialSlideValue = rangeObject.originalCoords[lightnessIndex];

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
      this.getAndSetLightnessRange(this.color, {
        constantChroma: this.constantChroma,
      });
    } else {
      console.warn(`no color specified to comp`);
    }
  }
}
