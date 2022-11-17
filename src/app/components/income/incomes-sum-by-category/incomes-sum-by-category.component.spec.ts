import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesSumByCategoryComponent } from './incomes-sum-by-category.component';

describe('IncomesSumByCategoryComponent', () => {
  let component: IncomesSumByCategoryComponent;
  let fixture: ComponentFixture<IncomesSumByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesSumByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesSumByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
