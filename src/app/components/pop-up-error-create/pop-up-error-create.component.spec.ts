import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpErrorCreateComponent } from './pop-up-error-create.component';

describe('PopUpErrorCreateComponent', () => {
  let component: PopUpErrorCreateComponent;
  let fixture: ComponentFixture<PopUpErrorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpErrorCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpErrorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
