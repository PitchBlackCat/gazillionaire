import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {GameComponent} from './game.component';
import {RouterModule} from '@angular/router';
import {PlayerCreatorComponent} from './components/player-creator/player-creator.component';
import {
  AccordionModule,
  ButtonModule, CardModule, DialogModule, DropdownModule, DynamicDialogModule, InputTextModule,
  ProgressBarModule, TabViewModule
} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import { TravelComponent } from './components/travel/travel.component';
import { AtPlanetComponent } from './components/at-planet/at-planet.component';
import {SharedModule} from '../../modules/shared/shared.module';


@NgModule({
  declarations: [GameComponent, PlayerCreatorComponent, TravelComponent, AtPlanetComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    CardModule,
    ProgressBarModule,
    TabViewModule,
    SharedModule,
    AccordionModule
  ]
})
export class GameModule {
}
