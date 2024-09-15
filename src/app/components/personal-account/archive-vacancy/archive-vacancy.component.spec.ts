import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveVacancyComponent } from './archive-vacancy.component';

describe('ArchiveVacancyComponent', () => {
  let component: ArchiveVacancyComponent;
  let fixture: ComponentFixture<ArchiveVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveVacancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
