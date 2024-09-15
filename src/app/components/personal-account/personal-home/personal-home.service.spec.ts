import { TestBed } from '@angular/core/testing';

import { PersonalHomeService } from './personal-home.service';

describe('PersonalHomeService', () => {
  let service: PersonalHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
