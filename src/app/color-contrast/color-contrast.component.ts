import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

export class ContrastObject {
  score: number | null = null;
  type: 'apca' | 'bpca' | null = null;
}

@Component({
  selector: 'app-color-contrast',
  templateUrl: './color-contrast.component.html',
  styleUrls: ['./color-contrast.component.scss'],
})
export class ColorContrastComponent implements OnChanges {
  @Input() colorOne: string | null = null;
  @Input() colorTwo: string | null = null;
  @Input() contrastType: 'apca' | 'bpca' | null = null;

  @Output() contrast = new EventEmitter<ContrastObject>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
