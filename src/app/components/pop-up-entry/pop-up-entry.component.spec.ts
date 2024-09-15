import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEntryComponent } from './pop-up-entry.component';

describe('PopUpEntryComponent', () => {
  let component: PopUpEntryComponent;
  let fixture: ComponentFixture<PopUpEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
