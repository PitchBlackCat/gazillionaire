import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreatorComponent } from './player-creator.component';

describe('PlayerCreatorComponent', () => {
  let component: PlayerCreatorComponent;
  let fixture: ComponentFixture<PlayerCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
