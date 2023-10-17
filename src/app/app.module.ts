import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ColorContrastComponent } from './color-contrast/color-contrast.component';
import { CopyToClipboardButtonComponent } from './copy-to-clipboard-button/copy-to-clipboard-button.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorSliderComponent,
    ColorPickerComponent,
    ColorContrastComponent,
    CopyToClipboardButtonComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
