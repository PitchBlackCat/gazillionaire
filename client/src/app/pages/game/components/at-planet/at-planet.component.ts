import {Component, Input, OnInit} from '@angular/core';
import {pluckMapAsArray} from '../../../../util/selectors';
import {ColyseusService} from '../../../../services/colyseus.service';
import {Destroyable} from '../../../../util/Destroyable';
import {Observable} from 'rxjs/index';
import {distinctUntilChanged, map, takeUntil} from 'rxjs/internal/operators';

@Component({
  selector: 'app-at-planet',
  templateUrl: './at-planet.component.html',
  styleUrls: ['./at-planet.component.sass']
})
export class AtPlanetComponent extends Destroyable implements OnInit {
  planet$: Observable<any>;
  pickupDisabled: boolean;
  @Input() player: any;
  get ship(): any {
    return this.player.ship;
  }
  private planets$: Observable<any>;

  constructor(readonly colyseus: ColyseusService) {
    super();
  }

  ngOnInit(): void {
    this.planets$ = this.colyseus.state$.pipe(pluckMapAsArray('planets'));
    this.planet$ = this.planets$.pipe(
      map(planets => planets.find(p => p.name === this.player.planet)),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );
  }

  leave(): void {
    this.colyseus.sendCommand('travel', {plane: null});
  }

  pickupPassengers(planet: any) {
    this.colyseus.sendCommand('pickup_passengers', {planet: planet.name});
    this.pickupDisabled = true;
  }

  buyGas(planet: any | null) {
    this.colyseus.sendCommand('buy_gas', {planet: planet.name});
  }
}
