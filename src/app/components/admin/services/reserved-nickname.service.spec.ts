import { TestBed } from '@angular/core/testing';

import { ReservedNicknameService } from './reserved-nickname.service';

describe('ReservedNicknameService', () => {
  let service: ReservedNicknameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservedNicknameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
