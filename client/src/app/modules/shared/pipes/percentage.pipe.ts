import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(a: number, b: number): number {
    return Math.round((a / b) * 100);
  }

}
