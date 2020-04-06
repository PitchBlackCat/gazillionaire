import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TvRoutingModule} from './tv-routing.module';
import {TvComponent} from './tv.component';
import {PlanetModule} from '../../components/planet/planet.module';
import {ShipModule} from '../../components/ship/ship.module';
import {SplashModule} from '../../components/splash/splash.module';


@NgModule({
  declarations: [TvComponent],
  imports: [
    CommonModule,
    TvRoutingModule,
    PlanetModule,
    ShipModule,
    SplashModule
  ]
})
export class TvModule {
}
