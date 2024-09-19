import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RESUMESComponent } from './resumes.component';

describe('RESUMESComponent', () => {
  let component: RESUMESComponent;
  let fixture: ComponentFixture<RESUMESComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RESUMESComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RESUMESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
