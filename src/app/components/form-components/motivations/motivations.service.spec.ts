import { TestBed } from '@angular/core/testing';

import { MotivationsService } from './motivations.service';

describe('MotivationsService', () => {
  let service: MotivationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
