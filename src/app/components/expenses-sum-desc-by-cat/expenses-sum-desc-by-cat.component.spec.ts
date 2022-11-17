import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSumDescByCatComponent } from './expenses-sum-desc-by-cat.component';

describe('ExpensesSumDescByCatComponent', () => {
  let component: ExpensesSumDescByCatComponent;
  let fixture: ComponentFixture<ExpensesSumDescByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSumDescByCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSumDescByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
