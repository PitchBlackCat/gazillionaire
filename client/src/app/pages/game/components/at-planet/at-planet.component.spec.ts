import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtPlanetComponent } from './at-planet.component';

describe('AtPlanetComponent', () => {
  let component: AtPlanetComponent;
  let fixture: ComponentFixture<AtPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
