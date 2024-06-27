import {
  Component,
  input,
  Output,
  EventEmitter,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorUtilService } from '../services/color-util.service';

export interface ResetObject {
  reset: true;
}

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class ColorSliderComponent {
  id = input<string | 'slider-0'>('slider-0');
  name = input<string | 'color-slider'>('color-slider');
  color = input<string>('');
  constantChroma = input<boolean>(false);
  showGradient = input<boolean>(false);
  resetSlider = input<ResetObject | null>(null);
  debug = input<boolean>(false);

  @Output() colorVariant = new EventEmitter<string | null>();

  cus = inject(ColorUtilService);

  devColorVariant: string = '';

  slideInterval: number = NaN;
  slideMin: number = NaN;
  slideMax: number = NaN;
  initValue: number = NaN;
  value: number = NaN;

  constructor() {
    effect(() => {
      const boundColor = this.color();
      const showGradient = this.showGradient();
      const resetSlider = this.resetSlider();
      const debug = this.debug();

      if (boundColor) {
        this.getAndSetLightnessRange(boundColor, {
          constantChroma: this.constantChroma(),
        });
      } else {
        if (debug) {
          console.warn(`no color specified to comp`);
        }
      }

      if (showGradient) {
        this.gradient('on');
      }

      if (!showGradient) {
        this.gradient('off');
      }

      if (resetSlider && this.initValue) {
        this.reset();
      }
    });
  }

  sendInitialLightVariant() {
    const color = this.color();

    // Good UX to just send the input color?
    this.colorVariant.emit(color);

    if (this.debug()) {
      this.devColorVariant = color;
    }
  }

  async getAndSetLightnessRange(
    color: string,
    options?: { constantChroma: boolean },
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

      this.redefineGradientStops(this.slideMin, this.slideMax);
    } else {
      console.error(`no range object for slider`);
    }
  }

  handleSliding(event: Event) {
    const inputElem = event.target as HTMLInputElement;

    if (inputElem) {
      const lightValue = parseFloat(inputElem.value);

      const boundColor = this.color();

      if (boundColor) {
        const lightnessVariant = this.cus.createSrgbColor(
          boundColor,
          lightValue,
        );

        if (this.debug()) {
          console.log(`slide modding ${this.color} to ${lightnessVariant}`);

          this.devColorVariant = !lightnessVariant ? '' : lightnessVariant;
        }

        this.colorVariant.emit(lightnessVariant);
      } else {
        console.error(`no color specified`);
      }
    }
  }

  reset() {
    // TODO: Isn't there an angular way to do this?
    const element = document.getElementById(this.id()) as HTMLInputElement;

    if (this.initValue) {
      element.value = this.initValue.toString();
    } else {
      console.error(`trouble resetting slider, initValue is ${this.initValue}`);
    }
  }

  gradient(val: 'on' | 'off') {
    // TODO: Anguar way to do this?
    const targetElem = document.getElementById(`cc-${this.id}`) as HTMLElement;

    if (targetElem) {
      if (val === 'on') {
        targetElem.style.background = 'var(--gradient-background)';
      }

      if (val === 'off') {
        targetElem.style.background = 'var(--default-background)';
      }
    } else {
      console.warn(`no elem to assign gradient to.`);
    }
  }

  redefineVariable(
    element: HTMLElement,
    variableName: string,
    newValue: string,
  ) {
    element.style.setProperty(variableName, newValue);
  }

  redefineGradientStops(lightMin: number, lightMax: number) {
    if (this.color()) {
      const targetElement = document.getElementById(
        `cc-${this.id}`,
      ) as HTMLElement;

      const stops = [
        '--grad-stop-0',
        '--grad-stop-1',
        '--grad-stop-2',
        '--grad-stop-3',
        '--grad-stop-4',
        '--grad-stop-5',
      ];

      // get new stop values
      const stopInterval = (lightMax - lightMin) / (stops.length - 1);
      const stopVals = [];

      for (let i = 0; i < stops.length; i++) {
        const targetLight = stopInterval * i + lightMin;
        targetLight;

        const boundColor = this.color();

        if (!boundColor) {
          console.error(`no color bound to redefine gradient stops with. . .`);

          break;
        } else {
          const stopColor = this.cus.createSrgbColor(boundColor, targetLight);

          stopVals.push(stopColor);
        }
      }

      // assign new stop values

      for (let i = 0; i < stops.length; i++) {
        const targetStop = stops[i];
        const targetStopVal = stopVals[i];

        if (targetStopVal) {
          this.redefineVariable(targetElement, targetStop, targetStopVal);
        } else {
          console.log(`no new val to assign`);
        }
      }
    } else {
      console.log(`no color specified`);
    }
  }
}
