import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {GameComponent} from './game.component';
import {RouterModule} from '@angular/router';
import {PlayerCreatorComponent} from './components/player-creator/player-creator.component';
import {ButtonModule, DialogModule, DropdownModule, DynamicDialogModule, InputTextModule} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import { TravelComponent } from './components/travel/travel.component';


@NgModule({
  declarations: [GameComponent, PlayerCreatorComponent, TravelComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    RouterModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    ReactiveFormsModule
  ]
})
export class GameModule {
}
