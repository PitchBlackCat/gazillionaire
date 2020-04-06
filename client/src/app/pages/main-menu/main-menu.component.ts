import {Component, OnInit} from '@angular/core';
import {ColyseusService} from '../../services/colyseus.service';
import {MenuItem} from 'primeng';
import {Observable} from 'rxjs/index';
import {Room} from 'colyseus.js';
import {switchMap, take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {

  items: MenuItem[];

  constructor(readonly colyseus: ColyseusService) {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'New', icon: 'pi pi-fw pi-plus', command: () => { this.newRoom() }},
      {label: 'Join', icon: 'pi pi-fw pi-download'},
      {label: 'Spectate', icon: 'pi pi-fw pi-eye'}
    ];
  }

  private newRoom() {
    this.colyseus.room$
      .pipe(take(1))
      .subscribe(room => {
        room.onMessage(console.log);
        room.send({command: 'new_game'});
      }, console.error);

    this.colyseus.createRoom('lobby');
  }
}
