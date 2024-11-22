import { TestBed } from '@angular/core/testing';

import { WordManagerService } from './word-manager.service';

describe('WordManagerService', () => {
  let service: WordManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
