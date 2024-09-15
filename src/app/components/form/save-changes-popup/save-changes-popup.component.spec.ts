import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveChangesPopupComponent } from './save-changes-popup.component';

describe('SaveChangesPopupComponent', () => {
  let component: SaveChangesPopupComponent;
  let fixture: ComponentFixture<SaveChangesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveChangesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveChangesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
