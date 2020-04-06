import {Component, OnInit} from '@angular/core';
import {ColyseusService, select} from '../../services/colyseus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, take} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {ObservableRoom} from '../../services/ObservableRoom';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.sass']
})
export class TvComponent implements OnInit {
  public state$: Observable<any>;
  public players$: Observable<any>;
  public planets$: Observable<any>;
  public room$: Observable<ObservableRoom>;

  constructor(readonly colyseus: ColyseusService,
              readonly activatedRoute: ActivatedRoute,
              readonly router: Router
  ) {
    this.room$ = this.colyseus.room$;
    this.state$ = this.room$.pipe(switchMap(r => r.onStateChange$));
    this.players$ = this.state$.pipe(select('players'));
    this.planets$ = this.state$.pipe(select('planets'));
  }

  public get width() {
    return environment.tv_width;
  }

  public get height() {
    return environment.tv_height;
  }

  ngOnInit(): void {
    this.joinRoom();
  }

  joinRoom() {
    this.room$
      .pipe(take(1))
      .subscribe(room => {
          this.updateRoute(room);
        }, console.error
      );

    const room = this.activatedRoute.snapshot.queryParamMap.get('room');
    if (!!room) {
      this.room$
        .pipe(take(1))
        .subscribe(null, () => {
          window.location.href = '/tv';
        });

      this.colyseus.joinRoom(room);
    } else {
      this.colyseus.createRoom('game');
    }
  }

  updateRoute(room: ObservableRoom) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {room: room.id},
        queryParamsHandling: 'merge'
      });
  }
}
