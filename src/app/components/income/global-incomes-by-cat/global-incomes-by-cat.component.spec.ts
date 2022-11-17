import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalIncomesByCatComponent } from './global-incomes-by-cat.component';

describe('GlobalIncomesByCatComponent', () => {
  let component: GlobalIncomesByCatComponent;
  let fixture: ComponentFixture<GlobalIncomesByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalIncomesByCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalIncomesByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
