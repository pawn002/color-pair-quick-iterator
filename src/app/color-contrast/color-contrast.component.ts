import { Component, effect, inject, input } from '@angular/core';
import {
  ColorMetricsService,
  ContrastType,
} from '../services/color-metrics.service';
import { ColorUtilService } from '../services/color-util.service';

export class ContrastObject {
  score: number = NaN;
  type: ContrastType | null = null;
}

@Component({
  selector: 'app-color-contrast',
  templateUrl: './color-contrast.component.html',
  styleUrls: ['./color-contrast.component.scss'],
  standalone: true,
})
export class ColorContrastComponent {
  colorOne = input<string>('');
  colorTwo = input<string>('');
  contrastType = input<ContrastType | 'apca object'>('apca');

  cus = inject(ColorUtilService);
  cms = inject(ColorMetricsService);

  contrastScore: number = NaN;

  constructor() {
    effect(() => {
      const colorOne = this.colorOne();
      const colorTwo = this.colorTwo();
      const contrastType = this.contrastType();

      if (colorOne && colorTwo && contrastType) {
        const isApcaLike =
          contrastType === 'apca object' || 'apca' ? true : false;

        const score = this.cms.getContrast(
          colorOne,
          colorTwo,
          isApcaLike ? 'apca' : 'bpca',
        );

        this.contrastScore = !score ? NaN : score;

        if (score) {
          this.contrastScore =
            contrastType === 'apca object'
              ? this.cus.getMinObjectDimension(score)
              : this.contrastScore;
        }
      } else {
        console.warn('contrast comp has incomplete bindings');
      }
    });
  }
}
