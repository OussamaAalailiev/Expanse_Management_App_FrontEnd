import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesSumDescByCatComponent } from './incomes-sum-desc-by-cat.component';

describe('IncomesSumDescByCatComponent', () => {
  let component: IncomesSumDescByCatComponent;
  let fixture: ComponentFixture<IncomesSumDescByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesSumDescByCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesSumDescByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
