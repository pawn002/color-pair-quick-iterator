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
  @Input() contrastType: ContrastType | null = null;

  @Output() contrast = new EventEmitter<ContrastObject>();

  contrastScore: number | null = null;

  constructor(private cms: ColorMetricsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);

    if (this.colorOne && this.colorTwo && this.contrastType) {
      const score = this.cms.getContrast(
        this.colorOne,
        this.colorTwo,
        this.contrastType
      );

      this.contrastScore = score;

      console.log(`score ${score}`);
    } else {
      console.error('contrast comp has incomplete bindings');
    }
  }
}
