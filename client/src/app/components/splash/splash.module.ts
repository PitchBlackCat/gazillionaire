import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SplashComponent} from './splash.component';


@NgModule({
  declarations: [SplashComponent],
  exports: [SplashComponent],
  imports: [
    CommonModule
  ]
})
export class SplashModule {
}
