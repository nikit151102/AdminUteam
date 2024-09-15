import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAvatarComponent } from './pop-up-avatar.component';

describe('PopUpAvatarComponent', () => {
  let component: PopUpAvatarComponent;
  let fixture: ComponentFixture<PopUpAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
