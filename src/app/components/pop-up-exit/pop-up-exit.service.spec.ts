import { TestBed } from '@angular/core/testing';

import { PopUpExitService } from './pop-up-exit.service';

describe('PopUpExitService', () => {
  let service: PopUpExitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpExitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
