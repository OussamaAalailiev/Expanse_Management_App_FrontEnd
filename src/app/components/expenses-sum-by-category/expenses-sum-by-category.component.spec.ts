import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSumByCategoryComponent } from './expenses-sum-by-category.component';

describe('ExpensesSumByCategoryComponent', () => {
  let component: ExpensesSumByCategoryComponent;
  let fixture: ComponentFixture<ExpensesSumByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSumByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSumByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
