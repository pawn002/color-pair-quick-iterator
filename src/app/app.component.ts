import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { ContrastType } from './services/color-metrics.service';
import { ColorUtilService } from './services/color-util.service';
import { CopyToClipboardEvent } from './copy-to-clipboard-button/copy-to-clipboard-button.component';
import { ResetObject } from './color-slider/color-slider.component';
import { AlertMessagObj } from './alert/alert.component';
import { TableColorCell } from './palette-table/palette-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  colorPickerOneSelectedColor: string | null = null;
  colorPickerOneComparedColor: string | null = null;

  colorPickerTwoSelectedColor: string | null = null;
  colorPickerTwoComparedColor: string | null = null;

  contrastType: ContrastType | 'apca object' = 'apca';

  resetSlider: ResetObject | null = null;

  constantChroma: boolean = true;
  showGradient: boolean = true;

  currentAlertMessage: AlertMessagObj | null = null;

  handleColorInputInput(inputNumber: 'One' | 'Two', event: string) {
    if (inputNumber === 'One') {
      this.colorPickerOneSelectedColor = event;
    }

    if (inputNumber === 'Two') {
      this.colorPickerTwoSelectedColor = event;
    }
  }

  handleSliderInputInput(inputNumber: 'One' | 'Two', event: string | null) {
    if (inputNumber === 'One') {
      this.colorPickerOneComparedColor = event;
    }

    if (inputNumber === 'Two') {
      this.colorPickerTwoComparedColor = event;
    }
  }

  handleCopyEvent(event: CopyToClipboardEvent) {
    if (event.copied) {
      this.alertUser({ message: `${event.color} copied to clipboard.` });
    } else {
      console.error(`color copy error.`);
    }
  }

  handleColorPaletteButtonEvent(
    paletteChartNum: 'One' | 'Two',
    event: TableColorCell
  ) {
    if (paletteChartNum === 'One') {
      this.colorPickerOneSelectedColor = event.color;
    }

    if (paletteChartNum === 'Two') {
      this.colorPickerTwoSelectedColor = event.color;
    }

    this.alertUser({
      message: `Color picker ${paletteChartNum} changed to ${event.color}`,
    });
  }

  radioChange(changeTo: ContrastType | 'apca object') {
    console.log(changeTo);
    this.contrastType = changeTo;
  }

  toggleConstantChroma(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.constantChroma = checked ? true : false;

    this.resetSliders();
  }

  toggleShowGradient(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.showGradient = checked ? true : false;
  }

  swapColors() {
    const getColor = (type: 'fg' | 'bg'): string | null => {
      let color: string | null = null;

      switch (type) {
        case 'fg':
          color = this.colorPickerOneSelectedColor;

          break;
        case 'bg':
          color = this.colorPickerTwoSelectedColor;

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
      this.colorPickerOneSelectedColor = newPairing.foreground;

      this.colorPickerTwoSelectedColor = newPairing.background;

      this.alertUser({ message: 'Swapped foreground and background colors.' });
    } else {
      console.error('swapping colors went badly. . .');
    }
  }

  async setRandomColorPair(initialAppColors?: boolean) {
    const initColorPair = await this.cus.getRandomColorPair();

    const randomColorPair = await this.cus.adjustColorPairForPresentation(
      initColorPair
    );

    setTimeout(() => {
      this.colorPickerOneSelectedColor = randomColorPair[0];
      this.colorPickerTwoSelectedColor = randomColorPair[1];

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
    if (this.colorPickerOneSelectedColor && this.colorPickerTwoSelectedColor) {
      const matchedColors = await this.cus.matchChromas([
        this.colorPickerOneSelectedColor,
        this.colorPickerTwoSelectedColor,
      ]);

      if (
        matchedColors.success &&
        matchedColors.colors &&
        matchedColors.chroma
      ) {
        this.colorPickerOneSelectedColor = matchedColors.colors[0];
        this.colorPickerTwoSelectedColor = matchedColors.colors[1];

        this.alertUser({
          message: `Chroma matched foreground and background colors.`,
        });
      } else {
        this.alertUser({ message: 'Unable to match  chroma across colors.' });
      }
    }
  }

  alertUser(message: AlertMessagObj) {
    this.currentAlertMessage = message;
  }

  constructor(private cus: ColorUtilService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setRandomColorPair(true);
  }
}
