import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoundPipe} from './pipes/round.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {PercentagePipe} from './pipes/percentage.pipe';


@NgModule({
  declarations: [RoundPipe, PercentagePipe, DistancePipe],
  exports: [RoundPipe, PercentagePipe, DistancePipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
