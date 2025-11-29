import {
  Component,
  input,
  Output,
  EventEmitter,
  inject,
  effect,
  output,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorUtilService } from '../../services/color-util.service';

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
  cus = inject(ColorUtilService);

  debug = input<boolean>(false);

  slideContainer = viewChild<ElementRef>('sliderContainer');

  id = input<string | 'slider-0'>('slider-0');
  name = input<string | 'color-slider'>('color-slider');
  color = input<string>('');
  constantChroma = input<boolean>(false);
  showGradient = input<boolean>(false);
  resetSlider = input<ResetObject | null>(null);

  colorVariant = output<string | null>();

  devColorVariant = signal<string>('');
  slideMin = signal<number>(NaN);
  slideMax = signal<number>(NaN);
  slideInterval = signal<number>(NaN);
  value = signal<number>(NaN);
  initValue = signal<number>(NaN);

  constructor() {
    effect(() => {
      const boundColor = this.color();
      const showGradient = this.showGradient();
      const resetSlider = this.resetSlider();
      const debug = this.debug();

      if (!this.slideContainer()) {
        if (debug) {
          console.warn(`no slide container view child yet.`);
        }

        return;
      }

      if (!boundColor) {
        if (debug) {
          console.error(`no color specified`);
        }

        return;
      }

      if (boundColor) {
        this.getAndSetLightnessRange(boundColor, {
          constantChroma: this.constantChroma(),
        });
      }

      if (showGradient) {
        this.gradient('on');
      }

      if (!showGradient) {
        this.gradient('off');
      }

      if (resetSlider && this.initValue()) {
        this.reset();
      }
    });
  }

  sendInitialLightVariant() {
    const color = this.color();

    // Good UX to just send the input color?
    this.colorVariant.emit(color);

    if (this.debug()) {
      this.devColorVariant.set(color);
    }
  }

  async getAndSetLightnessRange(color: string, options?: { constantChroma: boolean }) {
    const rangeObject = await this.cus.getMinMaxLight(color);

    if (!rangeObject) {
      console.error(`no range object for color ${color}`);

      return;
    }

    this.sendInitialLightVariant();

    this.slideMin.set(0);
    this.slideMax.set(1);

    if (options?.constantChroma) {
      this.slideMin.set(rangeObject.lightMin);

      this.slideMax.set(rangeObject.lightMax);
    }

    this.slideInterval.set((this.slideMax() - this.slideMin()) / 80);

    const lightnessIndex = 0;
    const initialSlideValue = rangeObject.originalCoords[lightnessIndex];

    this.initValue.set(initialSlideValue);

    this.value.set(initialSlideValue);

    this.redefineGradientStops(this.slideMin(), this.slideMax());
  }

  handleSliding(event: Event) {
    const inputElem = event.target as HTMLInputElement;

    if (inputElem) {
      const lightValue = parseFloat(inputElem.value);

      const boundColor = this.color();

      if (boundColor) {
        const lightnessVariant = this.cus.createSrgbColor(boundColor, lightValue);

        if (this.debug()) {
          console.log(`slide modding ${this.color} to ${lightnessVariant}`);

          this.devColorVariant.set(!lightnessVariant ? '' : lightnessVariant);
        }

        this.colorVariant.emit(lightnessVariant);
      } else {
        console.error(`no color specified`);
      }
    }
  }

  reset() {
    const compId = this.id();

    // TODO: Isn't there an angular way to do this?
    const element = document.getElementById(compId) as HTMLInputElement;

    if (!element) {
      console.error(`no element found with id: ${compId}`);
      return;
    }

    const initVal = this.initValue();
    if (!isNaN(initVal)) {
      element.value = initVal.toString();
    } else {
      console.error(`trouble resetting slider, initValue is ${initVal}`);
    }
  }

  gradient(val: 'on' | 'off') {
    const targetElem = this.slideContainer()?.nativeElement as HTMLElement;

    if (!targetElem) {
      if (this.debug()) {
        console.warn(`no elem to assign gradient to.`);
      }

      return;
    }

    if (val === 'on') {
      targetElem.style.background = 'var(--gradient-background)';
    }

    if (val === 'off') {
      targetElem.style.background = 'var(--default-background)';
    }
  }

  redefineVariable(element: HTMLElement, variableName: string, newValue: string) {
    element.style.setProperty(variableName, newValue);
  }

  redefineGradientStops(lightMin: number, lightMax: number) {
    const compId = this.id();

    if (this.color()) {
      const targetElement = document.getElementById(`cc-${compId}`) as HTMLElement;

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
