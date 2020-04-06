import {EventEmitter, Injectable} from '@angular/core';
import {Client} from 'colyseus.js';
import {Observable} from 'rxjs/index';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {ObservableRoom} from './ObservableRoom';
import {map, pluck, shareReplay, switchMap, take} from 'rxjs/internal/operators';
import {pipeFromArray} from 'rxjs/internal/util/pipe';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColyseusService {

  private client: Client;
  private _room$: EventEmitter<ObservableRoom> = new EventEmitter<ObservableRoom>();
  readonly room$: Observable<ObservableRoom> = this._room$.pipe(shareReplay(1));
  readonly state$: Observable<ObservableRoom> = this.room$.pipe(switchMap((r: ObservableRoom) => r.onStateChange$));
  readonly message$: Observable<ObservableRoom> = this.room$.pipe(switchMap((r: ObservableRoom) => r.onMessage$));

  constructor() {
    this.client = new Client(`ws://${environment.server_url}`);
  }

  createRoom(name: string): void {
    fromPromise(this.client.create(name))
      .pipe(map(r => ObservableRoom.fromRoom(r)))
      .subscribe(
        r => this._room$.emit(r),
        e => this._room$.error(e)
      );
  }

  joinRoom(id: string): void {
    fromPromise(this.client.joinById(id))
      .pipe(map(r => ObservableRoom.fromRoom(r)))
      .subscribe(
        r => this._room$.emit(r),
        e => this._room$.error(e)
      );
  }

  send(data: any): void {
    this.room$.pipe(take(1)).subscribe((r: ObservableRoom) => r.send(data));
  }

  sendCommand(command: string, data: any): void {
    this.send({command, data});
  }
}

export const select = (key: string) => pipeFromArray([
  pluck(key),
  map(p => Object.keys(p).map(k => p[k]))
]);
