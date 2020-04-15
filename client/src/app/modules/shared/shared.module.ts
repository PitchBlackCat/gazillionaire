import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoundPipe} from './pipes/round.pipe';
import {DistancePipe} from './pipes/distance.pipe';
import {PercentagePipe} from './pipes/percentage.pipe';
import {ColumnDirective} from './directives/column.directive';
import {RowDirective} from './directives/row.directive';
import {FlexItemDirective} from './directives/flex.directive';


@NgModule({
  declarations: [RoundPipe, PercentagePipe, DistancePipe, ColumnDirective, RowDirective, FlexItemDirective],
  exports: [RoundPipe, PercentagePipe, DistancePipe, ColumnDirective, RowDirective, FlexItemDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
