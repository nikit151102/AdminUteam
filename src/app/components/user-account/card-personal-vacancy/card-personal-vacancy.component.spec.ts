import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPersonalVacancyComponent } from './card-personal-vacancy.component';

describe('CardPersonalVacancyComponent', () => {
  let component: CardPersonalVacancyComponent;
  let fixture: ComponentFixture<CardPersonalVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPersonalVacancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPersonalVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
