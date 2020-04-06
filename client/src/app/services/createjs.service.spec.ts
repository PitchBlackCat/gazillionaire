import { TestBed } from '@angular/core/testing';

import { CreatejsService } from './createjs.service';

describe('CreatejsService', () => {
  let service: CreatejsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatejsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
