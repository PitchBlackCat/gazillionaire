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
  holder: createjs.Container;
  sprite: createjs.Sprite;
  @Input() planet;

  constructor(stageService: StageService) {
    super(stageService);
  }

  onTick(): void {
    this.holder.x = this.planet.pos.x;
    this.holder.y = this.planet.pos.y;
  }

  init(): void {
    this.holder = new createjs.Container();
    this.container.addChild(this.holder);

    const sheet = Preloader.get<createjs.SpriteSheet>('main', 'entities');
    this.sprite = new createjs.Sprite(sheet, this.planet.sprite);
    this.sprite.regX = this.sprite.getBounds().width / 2;
    this.sprite.regY = this.sprite.getBounds().height / 2;
    this.holder.addChild(this.sprite);

    const text = new createjs.Text(this.planet.name, "bold 16px Arial", "#ffff00");
    text.regX = text.getBounds().width / 2;
    text.regY = text.getBounds().height / 2;
    text.y = 45;
    this.holder.addChild(text);

    this.container.regX = this.size.cx;
    this.container.regY = this.size.cy;
  }

}
