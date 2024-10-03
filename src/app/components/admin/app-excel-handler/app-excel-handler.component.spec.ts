import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExcelHandlerComponent } from './app-excel-handler.component';

describe('AppExcelHandlerComponent', () => {
  let component: AppExcelHandlerComponent;
  let fixture: ComponentFixture<AppExcelHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExcelHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppExcelHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
