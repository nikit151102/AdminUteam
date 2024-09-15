import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSelectedLevelComponent } from './tag-selected-level.component';

describe('TagSelectedLevelComponent', () => {
  let component: TagSelectedLevelComponent;
  let fixture: ComponentFixture<TagSelectedLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSelectedLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagSelectedLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
