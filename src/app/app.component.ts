import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { ContrastType } from './services/color-metrics.service';
import { CopyToClipboardEvent } from './copy-to-clipboard-button/copy-to-clipboard-button.component';
import { ColorUtilService } from './services/color-util.service';

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

  contrastType: ContrastType = 'apca';

  constantChroma: boolean = false;

  showAlert: boolean = false;
  currentAlertMessage: string | null = null;

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
      this.alertUser(`${event.color} copied to clipboard.`);
    } else {
      console.error(`color copy error.`);
    }
  }

  toggleContrastType(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.contrastType = checked ? 'bpca' : 'apca';
  }

  toggleConstantChroma(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;

    this.constantChroma = checked ? true : false;
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

      this.alertUser('Swapped Color One and Two.');
    } else {
      console.error('swapping colors went badly. . .');
    }
  }

  alertUser(message: string) {
    this.showAlert = true;

    this.currentAlertMessage = message;
  }

  alertClosed(event: boolean) {
    if (event) {
      this.showAlert = false;
      this.currentAlertMessage = null;
    } else {
      console.error(`alert did something unexpected`);
    }
  }

  setRandomColorPair(initialAppColors?: boolean) {
    setTimeout(() => {
      const randomColorPair = this.cus.getRandomColorPair();

      this.colorPickerOneSelectedColor = randomColorPair[0];
      this.colorPickerTwoSelectedColor = randomColorPair[1];

      if (!initialAppColors) {
        this.alertUser(
          `Random color pair generated: ${randomColorPair[0]}, and ${randomColorPair[1]}`
        );
      }
    }, 0);
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

        this.alertUser(
          `Chroma matched colors to ${matchedColors.chroma.toFixed(2)}`
        );
      } else {
        this.alertUser('Unable to chroma match colors');
      }
    }
  }

  constructor(private cus: ColorUtilService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setRandomColorPair(true);
  }
}
