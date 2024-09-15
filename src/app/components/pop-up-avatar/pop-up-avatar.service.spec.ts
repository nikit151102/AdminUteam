import { TestBed } from '@angular/core/testing';

import { PopUpAvatarService } from './pop-up-avatar.service';

describe('PopUpAvatarService', () => {
  let service: PopUpAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
