import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveResumeComponent } from './archive-resume.component';

describe('ArchiveResumeComponent', () => {
  let component: ArchiveResumeComponent;
  let fixture: ComponentFixture<ArchiveResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
