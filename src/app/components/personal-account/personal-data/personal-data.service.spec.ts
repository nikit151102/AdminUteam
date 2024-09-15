import { TestBed } from '@angular/core/testing';

import { PersonalDataService } from './personal-data.service';

describe('PersonalDataService', () => {
  let service: PersonalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
