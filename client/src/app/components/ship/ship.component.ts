import {Component, Input, OnInit} from '@angular/core';
import {Manifest} from '../../createjs/decorator/preloadjs';
import {StageService} from '../../services/stage.service';
import {Preloader} from '../../services/preloadjs.service';
import {AbstractView} from '../../createjs/views/AbstractView';
import {CanvasSize} from '../../services/createjs.service';

@Manifest({
  key: 'planets',
  data: [
    {id: 'planets', src: '/assets/sprites/planets.json', type: 'spritesheet'}
  ]
})
@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass']
})
export class ShipComponent extends AbstractView {

  sprite: createjs.Sprite;

  constructor(stageService: StageService) {
    super(stageService);
  }

  @Input() ship;

  onTick(): void {
    this.sprite.x = this.ship.x;
    this.sprite.y = this.ship.y;
  }

  init(): void {
    const sheet = Preloader.get<createjs.SpriteSheet>('planets', 'planets');
    this.sprite = new createjs.Sprite(sheet, this.ship.sprite);
    this.sprite.regX = this.sprite.getBounds().width / 2;
    this.sprite.regY= this.sprite.getBounds().height / 2;

    this.container.addChild(this.sprite);
    this.container.regX = this.size.cx;
    this.container.regY = this.size.cy;
  }

}
