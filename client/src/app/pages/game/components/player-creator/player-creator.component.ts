import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ObservableRoom} from '../../../../services/ObservableRoom';
import {ColyseusService} from '../../../../services/colyseus.service';
import {Destroyable} from '../../../../util/Destroyable';
import {filter, map, takeUntil} from 'rxjs/internal/operators';
import {Observable, of} from 'rxjs/index';
import {pluckMapAsArray} from '../../../../util/selectors';

@Component({
  selector: 'app-player-creator',
  templateUrl: './player-creator.component.html',
  styleUrls: ['./player-creator.component.sass']
})
export class PlayerCreatorComponent extends Destroyable implements OnInit {
  public form: FormGroup;
  @Input() public room: ObservableRoom;
  public error$: Observable<string>;
  public ships$: Observable<any[]>;
  public state$: Observable<any>;

  public name;

  constructor(private fb: FormBuilder, readonly colyseus: ColyseusService) {
    super();
    this.state$ = this.colyseus.message$;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.ships$ = this.colyseus.message$.pipe(
      filter(m => m.type === 'data'),
      filter(m => m.subject === 'ships'),
      map(m => m.data),
      takeUntil(this.destroy$)
    );

    this.error$ = this.colyseus.message$.pipe(
      filter(m => m.type === 'error'),
      takeUntil(this.destroy$)
    );

    const loadedPlayer = JSON.parse(sessionStorage.getItem('player'));
    if (loadedPlayer) {
      this.form.patchValue(loadedPlayer);
    }

    this.colyseus.sendCommand('data','ships' );
  }

  saveName() {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      console.warn('Form has errors', this.form.errors);
      return false;
    }

    const data = this.form.getRawValue();
    sessionStorage.setItem('player', JSON.stringify(data));
    this.name = data.name;
  }

  join(ship: any) {
    const data = this.form.getRawValue();
    this.colyseus.sendCommand('join', {...data, sprite: ship.sprite});
  }
}
