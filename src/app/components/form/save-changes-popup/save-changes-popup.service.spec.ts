import { TestBed } from '@angular/core/testing';

import { SaveChangesPopupService } from './save-changes-popup.service';

describe('SaveChangesPopupService', () => {
  let service: SaveChangesPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveChangesPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
