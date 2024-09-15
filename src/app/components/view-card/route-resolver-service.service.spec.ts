import { TestBed } from '@angular/core/testing';

import { RouteResolverServiceService } from './route-resolver-service.service';

describe('RouteResolverServiceService', () => {
  let service: RouteResolverServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteResolverServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
