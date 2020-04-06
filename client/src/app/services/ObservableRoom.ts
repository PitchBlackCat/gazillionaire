import {Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {Room} from 'colyseus.js';
import {EventEmitter} from '@angular/core';

/**
 * Fix voor missing feature onTouchChanged
 *
 * https://github.com/angular/angular/issues/10887
 */
export abstract class ObservableRoom<T = any> extends Room<T> {

  abstract get onStateChange$(): Observable<any>;

  abstract get onMessage$(): Observable<any>;

  abstract get onError$(): Observable<any>;

  abstract get onLeave$(): Observable<any>;

  public static fromRoom<T = any>(room: Room<T>): ObservableRoom<T> {
    ObservableRoom.defineProperty(room, 'onStateChange');
    ObservableRoom.defineProperty(room, 'onMessage');
    ObservableRoom.defineProperty(room, 'onError');
    ObservableRoom.defineProperty(room, 'onLeave');

    return room as ObservableRoom<T>;
  }

  private static defineProperty(room: Room, propertyName: string) {
    const emitter = new EventEmitter<any>();
    room[propertyName](value => emitter.emit(value));

    const observable = emitter.asObservable();

    Object.defineProperty(room, propertyName + '$', {
      get: () => observable
    });
  }
}
