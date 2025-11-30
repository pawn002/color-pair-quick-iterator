import { Component, effect, inject, input, signal } from '@angular/core';
import { ColorMetricsService, ContrastType } from '../../services/color-metrics.service';
import { ColorUtilService } from '../../services/color-util.service';

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
  cus = inject(ColorUtilService);
  cms = inject(ColorMetricsService);

  colorOne = input<string>('');
  colorTwo = input<string>('');
  contrastType = input<ContrastType | 'apca object'>('apca');
  debug = input<boolean>(false);

  contrastScore = signal<number>(NaN);

  constructor() {
    effect(() => {
      const colorOne = this.colorOne();
      const colorTwo = this.colorTwo();
      const contrastType = this.contrastType();
      const debug = this.debug();

      if (!colorOne || !colorTwo || !contrastType) {
        if (debug) {
          console.warn('contrast comp missing inputs');
        }

        return;
      }

      // Determine the actual contrast type to use for calculation
      let calcType: ContrastType;
      if (contrastType === 'apca object') {
        calcType = 'apca';
      } else if (contrastType === 'deltaE') {
        calcType = 'deltaE';
      } else {
        calcType = contrastType;
      }

      const score = this.cms.getContrast(colorOne, colorTwo, calcType);

      if (score && contrastType === 'apca object') {
        this.contrastScore.set(this.cus.getMinObjectDimension(score));

        return;
      }

      this.contrastScore.set(score === null || score === undefined ? NaN : score);
    });
  }
}
