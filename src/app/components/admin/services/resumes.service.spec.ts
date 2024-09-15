import { TestBed } from '@angular/core/testing';

import { ResumesService } from './resumes.service';

describe('ResumesService', () => {
  let service: ResumesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
