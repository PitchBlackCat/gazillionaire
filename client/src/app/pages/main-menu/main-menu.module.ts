import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMenuRoutingModule } from './main-menu-routing.module';
import { MainMenuComponent } from './main-menu.component';
import {MenuModule} from 'primeng';


@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    MainMenuRoutingModule,
    MenuModule,
  ]
})
export class MainMenuModule { }
