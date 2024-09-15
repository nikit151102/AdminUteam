import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpExitComponent } from './pop-up-exit.component';

describe('PopUpExitComponent', () => {
  let component: PopUpExitComponent;
  let fixture: ComponentFixture<PopUpExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpExitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
