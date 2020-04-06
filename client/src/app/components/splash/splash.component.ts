import {Component} from '@angular/core';
import {Manifest} from '../../createjs/decorator/preloadjs';
import {AbstractView} from '../../createjs/views/AbstractView';
import {StageService} from '../../services/stage.service';
import {CanvasSize} from '../../services/createjs.service';
import {Preloader} from '../../services/preloadjs.service';

@Manifest({
  key: 'splash',
  data: [
    {id: 'background', src: '/assets/sprites/background.json', type: 'spritesheet'}
  ]
})
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.sass']
})
export class SplashComponent extends AbstractView {
  splash: createjs.Sprite;

  constructor(stageService: StageService) {
    super(stageService);
  }

  onTick(): void {
  }

  init(): void {
    const sheet = Preloader.get<createjs.SpriteSheet>('splash', 'background');
    this.splash = new createjs.Sprite(sheet, 'space');

    const bounds = this.splash.getBounds();
    this.size = new CanvasSize(bounds.width, bounds.height);

    this.splash.regX = this.splash.getBounds().width / 2;
    this.splash.regY = this.splash.getBounds().height / 2;

    this.container.addChild(this.splash);
  }
}
