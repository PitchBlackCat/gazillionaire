import {Injectable} from '@angular/core';
import {CreatejsService} from './createjs.service';

import {AbstractView} from '../createjs/views/AbstractView';


@Injectable({
  providedIn: 'root'
})
export class StageService {
  private container: createjs.Container;
  private views: AbstractView[] = [];

  constructor(readonly createjsService: CreatejsService) {
    this.container = new createjs.Container();

    this.createjsService.events.resize$.subscribe(viewport =>
      this.views.forEach(v => v.onResize(viewport))
    );

    this.createjsService.events.tick$.subscribe(() =>
      this.views.forEach(v => v.onTick())
    );

    this.createjsService.stage.addChild(this.container);
  }

  public add(v: AbstractView): void {
    this.container.addChild(v.container);
    this.views.push(v);
  }

  public remove(v: AbstractView) {
    this.container.removeChild(v.container);
    this.views.splice(this.views.indexOf(v), 1);
  }
}
