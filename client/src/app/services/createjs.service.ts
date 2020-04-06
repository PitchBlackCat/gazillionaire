import {Injectable, OnInit} from '@angular/core';
import {fromEvent, Observable, Subject} from 'rxjs/index';
import {map, shareReplay, take} from 'rxjs/internal/operators';
import {Stage, Ticker} from 'createjs-module';

@Injectable({
  providedIn: 'root'
})
export class CreatejsService {

  readonly stage: Stage;
  private canvas: HTMLCanvasElement;
  readonly events: CanvasEvents = new CanvasEvents();

  constructor() {
    this.stage = new createjs.Stage('canvas');
    this.canvas = this.stage.canvas as HTMLCanvasElement;
    this.events.tick$.subscribe(() => this.tick());
    this.events.resize$.subscribe(size => this.resize(size));

    this.events.tick$
      .pipe(take(1))
      .subscribe(() => {
        this.stage.enableMouseOver();
        window.dispatchEvent(new Event('resize'));
      });

    this.events.tick$.subscribe(() => this.tick());
    this.events.resize$.subscribe((s) => this.resize(s));
  }

  resize(s: CanvasSize) {
    this.canvas.width = s.w;
    this.canvas.height = s.h;
    this.tick();
  }

  tick() {
    this.stage.update();
  }
}

export class CanvasEvents {
  public readonly resize$: Observable<CanvasSize>;
  public readonly tick$: Observable<any>;

  constructor() {
    this.tick$ = fromEvent(createjs.Ticker, 'tick');

    this.resize$ = fromEvent(window, 'resize').pipe(
      map(() => new CanvasSize(
        Math.max(document.getElementById('canvas').getBoundingClientRect().width, 0),
        Math.max(document.getElementById('canvas').getBoundingClientRect().height, 0)
      )),
      shareReplay(1)
    );
  }
}

export class CanvasSize {
  public readonly w: number;
  public readonly h: number;
  public readonly cx: number;
  public readonly cy: number;
  public readonly ratio: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.cx = w / 2;
    this.cy = h / 2;
    this.ratio = this.w / this.h;
  }
}
