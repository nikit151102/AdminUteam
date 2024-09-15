import { TestBed } from '@angular/core/testing';

import { PopUpErrorCreateService } from './pop-up-error-create.service';

describe('PopUpErrorCreateService', () => {
  let service: PopUpErrorCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpErrorCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
