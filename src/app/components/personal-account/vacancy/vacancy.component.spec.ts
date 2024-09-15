import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalVacancyComponent } from './vacancy.component';

describe('VacancyComponent', () => {
  let component: PersonalVacancyComponent;
  let fixture: ComponentFixture<PersonalVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalVacancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
