import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import {RouterModule} from '@angular/router';
import { PlayerCreatorComponent } from './components/player-creator/player-creator.component';
import {InputTextModule} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [GameComponent, PlayerCreatorComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    RouterModule,
    InputTextModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
