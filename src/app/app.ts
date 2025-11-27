import { Component, signal, inject, AfterViewInit, effect } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  router = inject(Router);
  route = inject(ActivatedRoute);

  colorPickerOneSelectedColor = signal<string>('');
  colorPickerOneComparedColor = signal<string>('');

  colorPickerTwoSelectedColor = signal<string>('');
  colorPickerTwoComparedColor = signal<string>('');

  contrastType = signal<ContrastType | 'apca object'>('apca');

  resetSlider: ResetObject | null = null;

  constantChroma = signal<boolean>(true);
  showGradient = signal<boolean>(true);

  currentAlertMessage = signal<AlertMessagObj>(new AlertMessagObj());

  private isInitializing = true;

  constructor() {
    // Update URL when state changes
    effect(() => {
      if (this.isInitializing) return;

      const fg = this.colorPickerOneSelectedColor();
      const bg = this.colorPickerTwoSelectedColor();
      const type = this.contrastType();
      const chroma = this.constantChroma();
      const gradient = this.showGradient();

      this.updateUrl(fg, bg, type, chroma, gradient);
    });
  }

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

  private updateUrl(
    fg: string,
    bg: string,
    type: ContrastType | 'apca object',
    chroma: boolean,
    gradient: boolean
  ): void {
    const queryParams: Record<string, string> = {};

    if (fg) queryParams['fg'] = fg;
    if (bg) queryParams['bg'] = bg;
    if (type !== 'apca') queryParams['type'] = type;
    if (!chroma) queryParams['chroma'] = 'false';
    if (!gradient) queryParams['gradient'] = 'false';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private loadStateFromUrl(): boolean {
    const params = this.route.snapshot.queryParamMap;

    const fg = params.get('fg');
    const bg = params.get('bg');
    const type = params.get('type') as ContrastType | 'apca object' | null;
    const chroma = params.get('chroma');
    const gradient = params.get('gradient');

    let hasUrlState = false;

    if (fg) {
      this.colorPickerOneSelectedColor.set(fg);
      hasUrlState = true;
    }

    if (bg) {
      this.colorPickerTwoSelectedColor.set(bg);
      hasUrlState = true;
    }

    if (type && (type === 'apca' || type === 'bpca' || type === 'apca object')) {
      this.contrastType.set(type);
    }

    if (chroma !== null) {
      this.constantChroma.set(chroma !== 'false');
    }

    if (gradient !== null) {
      this.showGradient.set(gradient !== 'false');
    }

    return hasUrlState;
  }

  ngAfterViewInit(): void {
    const hasUrlState = this.loadStateFromUrl();

    if (!hasUrlState) {
      this.setRandomColorPair(true);
    }

    // Allow URL updates after initial load
    setTimeout(() => {
      this.isInitializing = false;
    }, 100);
  }
}
