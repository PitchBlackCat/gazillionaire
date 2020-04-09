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
  public visible = true;
  @Input() public room: ObservableRoom;
  public error$: Observable<string>;
  public ships$: Observable<{ label; value; }[]>;
  public state$: Observable<any>;

  constructor(private fb: FormBuilder, readonly colyseus: ColyseusService) {
    super();
    this.state$ = this.colyseus.message$;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      ship: ['', [Validators.required]],
    });

    this.ships$ = of(['Blue-1', 'Red-4', 'Yellow-3']).pipe(
      map((ps: any[]) => ps.map(p => ({label: p, value: p}))),
      map((ps: any[]) => [{label: 'Select a ship', value: ''}, ...ps]),
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
  }

  join() {
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      console.warn('Form has errors', this.form.errors);
      return false;
    }

    this.visible = false;
    sessionStorage.setItem('player', JSON.stringify(this.form.getRawValue()));
    this.colyseus.sendCommand('join', this.form.getRawValue());
  }
}
