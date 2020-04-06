import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlanetComponent} from './planet.component';


@NgModule({
  declarations: [PlanetComponent],
  exports: [PlanetComponent],
  imports: [
    CommonModule
  ]
})
export class PlanetModule {
}
