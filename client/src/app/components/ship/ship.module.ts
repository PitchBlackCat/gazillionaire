import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShipComponent} from './ship.component';



@NgModule({
  declarations: [ShipComponent],
  exports: [ShipComponent],
  imports: [
    CommonModule
  ]
})
export class ShipModule { }
