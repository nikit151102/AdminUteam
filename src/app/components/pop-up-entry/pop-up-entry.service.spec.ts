import { TestBed } from '@angular/core/testing';

import { PopUpEntryService } from './pop-up-entry.service';

describe('PopUpEntryService', () => {
  let service: PopUpEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
