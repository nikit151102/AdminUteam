import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordManagerComponent } from './word-manager.component';

describe('WordManagerComponent', () => {
  let component: WordManagerComponent;
  let fixture: ComponentFixture<WordManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
