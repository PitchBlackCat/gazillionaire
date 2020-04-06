import { TestBed } from '@angular/core/testing';

import { PreloadjsService } from './preloadjs.service';

describe('PreloadjsService', () => {
  let service: PreloadjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreloadjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
