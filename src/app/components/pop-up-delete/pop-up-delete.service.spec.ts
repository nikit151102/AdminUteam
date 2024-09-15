import { TestBed } from '@angular/core/testing';

import { PopUpDeleteService } from './pop-up-delete.service';

describe('PopUpDeleteService', () => {
  let service: PopUpDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
