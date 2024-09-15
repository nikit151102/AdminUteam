import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAvatarComponent } from './item-avatar.component';

describe('ItemAvatarComponent', () => {
  let component: ItemAvatarComponent;
  let fixture: ComponentFixture<ItemAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
