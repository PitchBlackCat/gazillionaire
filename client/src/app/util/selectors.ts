import {map, pluck} from 'rxjs/internal/operators';
import {pipeFromArray} from 'rxjs/internal/util/pipe';
import {Observable} from 'rxjs/index';

export const pluckMapAsArray = (key: string) => pipeFromArray([
  pluck(key),
  map(p => Object.keys(p).map(k => p[k]))
]);
