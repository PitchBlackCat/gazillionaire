import {Observable, of} from 'rxjs/index';
import {CanvasSize} from '../../services/createjs.service';
import {StageService} from '../../services/stage.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Preloader} from '../../services/preloadjs.service';

export abstract class AbstractView implements OnInit, OnDestroy {
  readonly container: createjs.Container;
  readonly destroy$: EventEmitter<void> = new EventEmitter<void>();
  protected size: CanvasSize = new CanvasSize(environment.tv_width, environment.tv_height);
  protected data: any;

  constructor(readonly stageService: StageService) {
    this.container = new createjs.Container();
  }

  public ngOnInit(): void {
    this.preload().subscribe(v => {
      v.init();
      this.stageService.add(this);
      window.dispatchEvent(new Event('resize'));
    });
  }

  public abstract onTick(): void;

  public abstract init(): void;

  public onResize(viewport: CanvasSize) {
    this.size.ratio > viewport.ratio
      ? this.container.scaleX = viewport.w / this.size.w
      : this.container.scaleX = viewport.h / this.size.h;

    // noinspection JSSuspiciousNameCombination
    this.container.scaleY = this.container.scaleX;

    this.container.x = viewport.cx;
    this.container.y = viewport.cy;
  }

  public ngOnDestroy(): void {
    this.destroy$.emit();
    this.stageService.remove(this);
  }

  private preload(): Observable<AbstractView> {
    const manifest = this['manifest'];
    return manifest
      ? Preloader.findOrCreate(manifest.key, manifest.data).complete$.pipe(map(() => this))
      : of(this);
  }
}
