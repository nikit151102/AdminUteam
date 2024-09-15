import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalHomeComponent } from './personal-home.component';

describe('PersonalHomeComponent', () => {
  let component: PersonalHomeComponent;
  let fixture: ComponentFixture<PersonalHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
