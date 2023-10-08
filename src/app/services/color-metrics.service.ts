import { Injectable } from '@angular/core';

export type ContrastType = 'apca' | 'bpca';
@Injectable({
  providedIn: 'root',
})
export class ColorMetricsService {
  getContrast(colorOne: string, colorTwo: string, contrastType: ContrastType) {
    console.log(colorOne, colorTwo, contrastType);
  }

  constructor() {}
}
