import {Component, Input} from '@angular/core';
import {Manifest} from '../../createjs/decorator/preloadjs';
import {StageService} from '../../services/stage.service';
import {Preloader} from '../../services/preloadjs.service';
import {AbstractView} from '../../createjs/views/AbstractView';

@Manifest({
  key: 'main',
  data: [
    {id: 'entities', src: '/assets/sprites/planets.json', type: 'spritesheet'}
  ]
})
@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass']
})
export class ShipComponent extends AbstractView {

  holder: createjs.Container;
  ship_holder: createjs.Container;
  sprite: createjs.Sprite;
  thruster: createjs.Sprite;
  @Input() ship;
  @Input() name: string;

  constructor(stageService: StageService) {
    super(stageService);
  }

  onTick(): void {
    if (this.ship.pos.x !== this.holder.x)
      this.ship_holder.scaleX = this.ship.pos.x > this.holder.x ? 1 : -1;

    this.holder.x = this.ship.pos.x;
    this.holder.y = this.ship.pos.y;

    this.thruster.visible = this.ship.burning;
  }

  init(): void {
    this.holder = new createjs.Container();
    this.ship_holder = new createjs.Container();
    this.holder.addChild(this.ship_holder);
    this.container.addChild(this.holder);

    const sheet = Preloader.get<createjs.SpriteSheet>('main', 'entities');
    this.sprite = new createjs.Sprite(sheet, this.ship.sprite);
    this.sprite.regX = this.sprite.getBounds().width / 2;
    this.sprite.regY = this.sprite.getBounds().height / 2;
    this.ship_holder.addChild(this.sprite);

    this.thruster = new createjs.Sprite(sheet, 'horizontal-thrust-03');
    this.thruster.regX = this.thruster.getBounds().width / 2;
    this.thruster.regY = this.thruster.getBounds().height / 2;
    this.thruster.x = -24;
    this.ship_holder.addChild(this.thruster);

    const text = new createjs.Text(this.name, "bold 16px Arial", "#ffffff");
    text.regX = text.getBounds().width / 2;
    text.regY = text.getBounds().height / 2;
    text.y = -25;
    this.holder.addChild(text);

    this.container.regX = this.size.cx;
    this.container.regY = this.size.cy;
  }

}
