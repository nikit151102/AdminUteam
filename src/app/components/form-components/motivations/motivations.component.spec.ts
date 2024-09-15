import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationsComponent } from './motivations.component';

describe('MotivationsComponent', () => {
  let component: MotivationsComponent;
  let fixture: ComponentFixture<MotivationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
