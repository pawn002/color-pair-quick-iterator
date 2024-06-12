import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  effect,
  inject,
  input,
} from '@angular/core';
import {
  ColorMetricsService,
  ContrastType,
} from '../services/color-metrics.service';
import { ColorUtilService } from '../services/color-util.service';

export class ContrastObject {
  score: number | null = null;
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

  contrastScore: number | null = null;

  constructor() {
    effect(() => {
      if (this.colorOne() && this.colorTwo() && this.contrastType) {
        const isApcaLike =
          this.contrastType() === 'apca object' || 'apca' ? true : false;

        const score = this.cms.getContrast(
          this.colorOne(),
          this.colorTwo(),
          isApcaLike ? 'apca' : 'bpca',
        );

        this.contrastScore = score;

        if (score) {
          this.contrastScore =
            this.contrastType() === 'apca object'
              ? this.cus.getMinObjectDimension(score)
              : this.contrastScore;
        }
      } else {
        console.warn('contrast comp has incomplete bindings');
      }
    });
  }
}
