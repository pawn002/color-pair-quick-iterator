import {
  Component,
  Input,
  OnChanges,
  OnInit,
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

  getLightnessRange() {}

  handleSliding() {
    console.log(`slide modding ${this.color}`);

    this.cus.getMinMaxLight(this.color as string);
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
  }
}
