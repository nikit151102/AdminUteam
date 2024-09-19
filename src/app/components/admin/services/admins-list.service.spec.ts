import { TestBed } from '@angular/core/testing';

import { AdminsListService } from './admins-list.service';

describe('AdminsListService', () => {
  let service: AdminsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
