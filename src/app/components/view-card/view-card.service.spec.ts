import { TestBed } from '@angular/core/testing';

import { ViewCardService } from './view-card.service';

describe('ViewCardService', () => {
  let service: ViewCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
