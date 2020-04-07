import {map, pluck} from 'rxjs/internal/operators';
import {pipeFromArray} from 'rxjs/internal/util/pipe';

export const pluckMapAsArray = (key: string) => pipeFromArray([
  pluck(key),
  map(p => Object.keys(p).map(k => p[k]))
]);
