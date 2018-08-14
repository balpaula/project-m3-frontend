import { TestBed, inject } from '@angular/core/testing';

import { SetMapService } from './set-map.service';

describe('SetMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetMapService]
    });
  });

  it('should be created', inject([SetMapService], (service: SetMapService) => {
    expect(service).toBeTruthy();
  }));
});
