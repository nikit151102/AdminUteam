import { TestBed } from '@angular/core/testing';

import { SettingHeaderService } from './setting-header.service';

describe('SettingHeaderService', () => {
  let service: SettingHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
