import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorViewCardComponent } from './error-view-card.component';

describe('ErrorViewCardComponent', () => {
  let component: ErrorViewCardComponent;
  let fixture: ComponentFixture<ErrorViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorViewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
