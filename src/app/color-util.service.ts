import { Injectable } from '@angular/core';
import Color from 'colorjs.io';

@Injectable({
  providedIn: 'root',
})
export class ColorUtilService {
  parseColor(color: string) {
    let parsedColor: Object | null = null;

    try {
      parsedColor = Color.parse(color);
    } catch (error) {
      console.error(error);
    }
    return parsedColor;
  }

  generateAllLightnessCandidatesWithConstantChroma(color: string) {
    const parsedColor = this.parseColor(color);

    console.log(parsedColor);
  }

  constructor() {}
}
