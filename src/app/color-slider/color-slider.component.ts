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

  slideInterval: number | null = 0.001;
  slideMin: number | null = null;
  slideMax: number | null = null;
  value: number | null = null;

  async getAndSetLightnessRange(color: string) {
    const rangeObject = await this.cus.getMinMaxLight(color);

    if (rangeObject) {
      this.slideMin = rangeObject.lightMin;
      this.slideMax = rangeObject.lightMax;

      const initialSlideValue = rangeObject.originalCoords[0];
      this.value = initialSlideValue;
    } else {
      console.error(`no range object for slider`);
    }
  }

  handleSliding(event: Event) {
    console.log(`slide modding ${this.color}`);

    const inputElem = event.target as HTMLInputElement;

    if (inputElem) {
      const lightValue = parseFloat(inputElem.value);

      if (this.color) {
        const lightnessVariant = this.cus.createSrgbColor(
          this.color,
          lightValue
        );

        this.colorVariant.emit(lightnessVariant);
      } else {
        console.error(`no color specified`);
      }
    }
  }

  constructor(private cus: ColorUtilService) {}

  ngOnInit(): void {
    console.log(`
      slide onInit. . .
      ${this.color}
    `);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`
      slide onChanges. . .
      ${this.color}
    `);

    console.log(changes);

    if (this.color) {
      this.getAndSetLightnessRange(this.color);
    } else {
      console.error(`no color specified to comp`);
    }
  }
}
