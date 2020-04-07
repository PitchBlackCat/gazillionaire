import {Component, Input, OnInit} from '@angular/core';
import {Manifest} from '../../createjs/decorator/preloadjs';
import {StageService} from '../../services/stage.service';
import {AbstractView} from '../../createjs/views/AbstractView';
import {Preloader} from '../../services/preloadjs.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.sass']
})
@Manifest({
  key: 'main',
  data: [
    {id: 'entities', src: '/assets/sprites/planets.json', type: 'spritesheet'}
  ]
})
export class PlanetComponent extends AbstractView implements OnInit {
  sprite: createjs.Sprite;

  constructor(stageService: StageService) {
    super(stageService);
  }

  @Input() planet;

  onTick(): void {
    this.sprite.x = this.planet.x;
    this.sprite.y = this.planet.y;
  }

  init(): void {
    const sheet = Preloader.get<createjs.SpriteSheet>('main', 'entities');
    this.sprite = new createjs.Sprite(sheet, this.planet.sprite);
    this.sprite.regX = this.sprite.getBounds().width / 2;
    this.sprite.regY= this.sprite.getBounds().height / 2;

    this.container.addChild(this.sprite);
    this.container.regX = this.size.cx;
    this.container.regY = this.size.cy;
  }

}
