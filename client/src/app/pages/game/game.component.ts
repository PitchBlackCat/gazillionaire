import {Component, OnInit} from '@angular/core';
import {ColyseusService} from '../../services/colyseus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ObservableRoom} from '../../services/ObservableRoom';
import {combineLatest, Observable} from 'rxjs/index';
import {map, pluck, shareReplay, takeUntil} from 'rxjs/internal/operators';
import {pluckMapAsArray} from '../../util/selectors';
import {Destroyable} from '../../util/Destroyable';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent extends Destroyable implements OnInit {
  public player$: Observable<any>;
  public room$: Observable<ObservableRoom>;

  constructor(readonly colyseus: ColyseusService, readonly activatedRoute: ActivatedRoute, readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    this.room$ = this.colyseus.room$;

    this.player$ = combineLatest([
      this.colyseus.state$.pipe(pluck('players')),
      this.colyseus.whoami$
    ]).pipe(
      map(([players, me]) => players[me] || null),
      shareReplay(1)
    );

    this.colyseus.joinRoom(this.activatedRoute.snapshot.paramMap.get('room'));
  }

  pickPlanet(room: ObservableRoom, planet: any) {
    room.send({command: 'travel', planet: planet.name})
  }
}
