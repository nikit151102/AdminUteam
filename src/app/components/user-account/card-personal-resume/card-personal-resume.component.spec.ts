import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPersonalResumeComponent } from './card-personal-resume.component';

describe('CardPersonalResumeComponent', () => {
  let component: CardPersonalResumeComponent;
  let fixture: ComponentFixture<CardPersonalResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPersonalResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPersonalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
