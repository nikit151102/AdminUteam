import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsListComponent } from './admins-list.component';

describe('AdminsListComponent', () => {
  let component: AdminsListComponent;
  let fixture: ComponentFixture<AdminsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
