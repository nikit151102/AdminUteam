import { TestBed } from '@angular/core/testing';

import { AvatarSelectionService } from './avatar-selection.service';

describe('AvatarSelectionService', () => {
  let service: AvatarSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
