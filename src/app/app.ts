import { Component, signal, inject, AfterViewInit } from '@angular/core';

import { ContrastType } from './services/color-metrics.service';
import { ColorUtilService } from './services/color-util.service';
import { CopyToClipboardEvent } from './_components/copy-to-clipboard-button/copy-to-clipboard-button.component';
import { ResetObject } from './_components/color-slider/color-slider.component';
import { AlertMessagObj } from './_components/alert/alert.component';
import { TableColorCell } from './_components/palette-table/palette-table.component';

import { AlertComponent } from './_components/alert/alert.component';
import { ColorContrastComponent } from './_components/color-contrast/color-contrast.component';
import { ColorPickerComponent } from './_components/color-picker/color-picker.component';
import { ColorSliderComponent } from './_components/color-slider/color-slider.component';
import { CopyToClipboardButtonComponent } from './_components/copy-to-clipboard-button/copy-to-clipboard-button.component';
import { MetadataComponent } from './_components/metadata/metadata.component';
import { PaletteTableComponent } from './_components/palette-table/palette-table.component';

@Component({
  selector: 'app-root',
  imports: [
    ColorContrastComponent,
    ColorPickerComponent,
    ColorSliderComponent,
    CopyToClipboardButtonComponent,
    MetadataComponent,
    PaletteTableComponent,
    AlertComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  cus = inject(ColorUtilService);

  colorPickerOneSelectedColor = signal<string>('');
  colorPickerOneComparedColor = signal<string>('');

  colorPickerTwoSelectedColor = signal<string>('');
  colorPickerTwoComparedColor = signal<string>('');

  contrastType = signal<ContrastType | 'apca object'>('apca');

  resetSlider: ResetObject | null = null;

  constantChroma = signal<boolean>(true);
  showGradient = signal<boolean>(true);

  currentAlertMessage = signal<AlertMessagObj>(new AlertMessagObj());

  handleColorInputInput(inputNumber: 'One' | 'Two', event: string) {
    if (inputNumber === 'One') {
      this.colorPickerOneSelectedColor.set(event);
    }

    if (inputNumber === 'Two') {
      this.colorPickerTwoSelectedColor.set(event);
    }
  }

  handleSliderInputInput(inputNumber: 'One' | 'Two', event: string | null) {
    if (inputNumber === 'One' && event) {
      this.colorPickerOneComparedColor.set(event);
    }

    if (inputNumber === 'Two' && event) {
      this.colorPickerTwoComparedColor.set(event);
    }
  }

  handleCopyEvent(event: CopyToClipboardEvent) {
    if (event.copied) {
      this.alertUser({ message: `${event.color} copied to clipboard.` });
    } else {
      console.error(`color copy error.`);
    }
  }

  handleColorPaletteButtonEvent(paletteChartNum: 'One' | 'Two', event: TableColorCell) {
    if (paletteChartNum === 'One') {
      this.colorPickerOneSelectedColor.set(event.color);
    }

    if (paletteChartNum === 'Two') {
      this.colorPickerTwoSelectedColor.set(event.color);
    }

    this.alertUser({
      message: `Color picker ${paletteChartNum} changed to ${event.color}`,
    });
  }

  radioChange(changeTo: ContrastType | 'apca object') {
    console.log(changeTo);
    this.contrastType.set(changeTo);
  }

  toggleConstantChroma(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.constantChroma.set(checked ? true : false);

    this.resetSliders();
  }

  toggleShowGradient(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.showGradient.set(checked ? true : false);
  }

  swapColors() {
    const getColor = (type: 'fg' | 'bg'): string | null => {
      let color: string | null = null;

      switch (type) {
        case 'fg':
          color = this.colorPickerOneSelectedColor();

          break;
        case 'bg':
          color = this.colorPickerTwoSelectedColor();

          break;

        default:
          break;
      }

      return color;
    };

    const oldPairing = {
      foreground: getColor('fg'),
      background: getColor('bg'),
    };

    const newPairing = {
      foreground: oldPairing.background,
      background: oldPairing.foreground,
    };

    if (newPairing.foreground && newPairing.background) {
      this.colorPickerOneSelectedColor.set(newPairing.foreground);

      this.colorPickerTwoSelectedColor.set(newPairing.background);

      this.alertUser({ message: 'Swapped foreground and background colors.' });
    } else {
      console.error('swapping colors went badly. . .');
    }
  }

  async setRandomColorPair(initialAppColors?: boolean) {
    const initColorPair = await this.cus.getRandomColorPair();

    const randomColorPair = await this.cus.adjustColorPairForPresentation(initColorPair);

    setTimeout(() => {
      this.colorPickerOneSelectedColor.set(randomColorPair[0]);
      this.colorPickerTwoSelectedColor.set(randomColorPair[1]);

      if (!initialAppColors) {
        this.alertUser({
          message: `Random color pair generated: ${randomColorPair[0]}, and ${randomColorPair[1]}`,
        });
      }
    }, 0);
  }

  resetSliders() {
    this.resetSlider = { reset: true };

    this.alertUser({ message: 'Resetted color sliders to initial states.' });
  }

  async matchChromas() {
    if (this.colorPickerOneSelectedColor() && this.colorPickerTwoSelectedColor()) {
      const matchedColors = await this.cus.matchChromas([
        this.colorPickerOneSelectedColor(),
        this.colorPickerTwoSelectedColor(),
      ]);

      if (matchedColors.success && matchedColors.colors && matchedColors.chroma) {
        this.colorPickerOneSelectedColor.set(matchedColors.colors[0]);
        this.colorPickerTwoSelectedColor.set(matchedColors.colors[1]);

        this.alertUser({
          message: `Chroma matched foreground and background colors.`,
        });
      } else {
        this.alertUser({ message: 'Unable to match  chroma across colors.' });
      }
    }
  }

  alertUser(message: AlertMessagObj) {
    this.currentAlertMessage.set(message);
  }

  ngAfterViewInit(): void {
    this.setRandomColorPair(true);
  }
}
