import {Injectable} from '@angular/core';
import {fromEvent, Observable} from 'rxjs/index';
import {map, shareReplay, take, takeUntil, tap} from 'rxjs/internal/operators';
import {Logger} from '../util/Logger';

@Injectable({
  providedIn: 'root'
})
export class PreloadjsService {


}


export class Preloader {

  private static queues: { [key: string]: createjs.LoadQueue } = {};

  public readonly progress$: Observable<number>;
  public readonly error$: Observable<any>;
  public readonly complete$: Observable<any>;
  private queue: createjs.LoadQueue;

  constructor(key: string, manifest: any) {
    this.queue = new createjs.LoadQueue();
    this.queue.loadManifest(manifest);

    this.complete$ = fromEvent(this.queue, 'complete').pipe(
      tap(() => Preloader.queues[key] = this.queue),
      map(event => this.queue.getItems(true)),
      take(1),
      shareReplay(1)
    );

    this.progress$ = fromEvent(this.queue, 'progress').pipe(
      map(() => (this.queue.progress * 100 | 0)),
      shareReplay(1),
      takeUntil(this.complete$)

    );

    this.error$ = fromEvent(this.queue, 'error').pipe(
      tap(err => Logger.error(Logger.MANIFEST, err)),
      shareReplay(1),
      takeUntil(this.complete$)
    );
  }

  static get<T>(manifest: string, key: string): T {
    return <T>Preloader.queues[manifest].getResult(key);
  }

  load(): Preloader {
      this.queue.load();
      return this;
  }

}
