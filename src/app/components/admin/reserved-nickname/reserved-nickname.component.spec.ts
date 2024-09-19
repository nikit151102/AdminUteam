import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedNicknameComponent } from './reserved-nickname.component';

describe('ReservedNicknameComponent', () => {
  let component: ReservedNicknameComponent;
  let fixture: ComponentFixture<ReservedNicknameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservedNicknameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
