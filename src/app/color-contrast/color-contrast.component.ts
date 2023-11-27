import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
})
export class ColorContrastComponent implements OnChanges {
  @Input() colorOne: string | null = null;
  @Input() colorTwo: string | null = null;
  @Input() contrastType: ContrastType | 'apca object' | null = null;

  @Output() contrast = new EventEmitter<ContrastObject>();

  contrastScore: number | null = null;

  constructor(
    private cms: ColorMetricsService,
    private cus: ColorUtilService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);

    if (this.colorOne && this.colorTwo && this.contrastType) {
      const score = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        this.contrastType === 'apca object' ? 'apca' : this.contrastType
      );

      this.contrastScore = score;

      if (score) {
        this.contrastScore =
          this.contrastType === 'apca object'
            ? this.cus.getMinObjectDimension(score)
            : this.contrastScore;
      }
    } else {
      console.warn('contrast comp has incomplete bindings');
    }
  }
}
