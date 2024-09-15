import { TestBed } from '@angular/core/testing';

import { FormSettingService } from './form-setting.service';

describe('FormSettingService', () => {
  let service: FormSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
