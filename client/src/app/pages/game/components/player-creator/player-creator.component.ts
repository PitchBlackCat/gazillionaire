import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ObservableRoom} from '../../../../services/ObservableRoom';
import {ColyseusService} from '../../../../services/colyseus.service';
import {Destroyable} from '../../../../util/Destroyable';
import {filter} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-player-creator',
  templateUrl: './player-creator.component.html',
  styleUrls: ['./player-creator.component.sass']
})
export class PlayerCreatorComponent extends Destroyable implements OnInit {
  public form: FormGroup;
  @Input() public room: ObservableRoom;
  @Input() public room: ObservableRoom;
  public error$: Observable<string>;

  constructor(private fb: FormBuilder, readonly colyseus: ColyseusService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.error$ = this.colyseus.message$.pipe(
      filter(m => m.type === 'error')
    );
  }

  join() {
    if (this.form.invalid) return false;
    this.colyseus.sendCommand('join', {name: this.form.getRawValue().name});
  }

}
