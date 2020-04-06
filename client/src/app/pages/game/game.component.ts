import {Component, OnInit} from '@angular/core';
import {ColyseusService, select} from '../../services/colyseus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ObservableRoom} from '../../services/ObservableRoom';
import {Observable} from 'rxjs/index';
import {map, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  public state$: Observable<any>;
  public planets$: Observable<any>;
  public players$: Observable<any[]>;
  public player$: Observable<any>;
  public room$: Observable<ObservableRoom>;

  constructor(readonly colyseus: ColyseusService, readonly activatedRoute: ActivatedRoute, readonly router: Router) {
    this.room$ = this.colyseus.room$;
    this.state$ = this.room$.pipe(switchMap(r => r.onStateChange$));
    this.planets$ = this.state$.pipe(select('planets'));
    this.players$ = this.state$.pipe(select('players')) as Observable<any[]>;
    this.player$ = this.players$.pipe(map(ps => ps.filter(p => p.name === this.name)[0] || null));
  }

  private get name(): string {
    return sessionStorage.getItem('name') || null;
  }

  ngOnInit(): void {
    this.colyseus.room$.subscribe(room => {
      room.send({command: 'join'});
    });

    this.colyseus.joinRoom(this.activatedRoute.snapshot.paramMap.get('room'));
  }

  pickPlanet(room: ObservableRoom, planet: any) {
    room.send({command: 'travel', planet: planet.name})
  }
}
