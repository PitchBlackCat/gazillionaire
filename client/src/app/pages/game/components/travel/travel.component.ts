import {Component, OnInit} from '@angular/core';
import {ColyseusService} from '../../../../services/colyseus.service';
import {pluckMapAsArray} from '../../../../util/selectors';
import {combineLatest, Observable} from 'rxjs/index';
import {Destroyable} from '../../../../util/Destroyable';
import {ObservableRoom} from '../../../../services/ObservableRoom';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.sass']
})
export class TravelComponent extends Destroyable implements OnInit {
  planets$: Observable<any>;

  constructor(readonly colyseus: ColyseusService) {
    super();
  }

  ngOnInit(): void {
    this.planets$ = this.colyseus.state$.pipe(pluckMapAsArray('planets'));
  }

  pickPlanet(room: ObservableRoom, planet: any) {
    this.colyseus.sendCommand('travel', { planet: planet.name})
  }
}
