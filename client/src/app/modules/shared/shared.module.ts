import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoundPipe} from './pipes/round.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {PercentagePipe} from './pipes/percentage.pipe';
import {ColumnDirective} from './directives/column/column.directive';
import {RowDirective} from './directives/row/row.directive';


@NgModule({
  declarations: [RoundPipe, PercentagePipe, DistancePipe, ColumnDirective, RowDirective],
  exports: [RoundPipe, PercentagePipe, DistancePipe, ColumnDirective, RowDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
