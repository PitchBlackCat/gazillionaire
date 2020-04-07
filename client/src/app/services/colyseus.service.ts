import {EventEmitter, Injectable} from '@angular/core';
import {Client} from 'colyseus.js';
import {Observable} from 'rxjs/index';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
import {ObservableRoom} from './ObservableRoom';
import {filter, map, shareReplay, switchMap, take} from 'rxjs/internal/operators';
import {environment} from '../../environments/environment';
import {Logger} from '../util/Logger';

@Injectable({
  providedIn: 'root'
})
export class ColyseusService {

  private client: Client;
  private _room$: EventEmitter<ObservableRoom> = new EventEmitter<ObservableRoom>();
  readonly room$: Observable<ObservableRoom> = this._room$.pipe(shareReplay(1));

  readonly state$: Observable<any> = this.room$.pipe(
    switchMap((r: ObservableRoom) => r.onStateChange$),
    shareReplay(1)
  );

  readonly message$: Observable<any> = this.room$.pipe(
    switchMap((r: ObservableRoom) => r.onMessage$),
    shareReplay(1)
  );

  readonly whoami$: Observable<any> = this.message$.pipe(
    filter(m => m.type === 'whoami'),
    map(m => m.data),
    shareReplay(1)
  );


  constructor() {
    this.client = new Client(environment.server_url);
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
    this.room$.pipe(take(1)).subscribe((r: ObservableRoom) => {
      Logger.log(Logger.ENGINE, `sending command ${data.command}`);
      r.send(data)
    });
  }

  sendCommand(command: string, data: any): void {
    Logger.log(Logger.ENGINE, `Queued command ${command}`);
    this.send({command, data});
  }
}
