import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BannerComponent,
    SliderComponent
  ],
  exports: [
    SliderComponent,
    BannerComponent
  ]
})

export class UiModule {}
