import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalExpensesByCatComponent } from './global-expenses-by-cat.component';

describe('GlobalExpensesByCatComponent', () => {
  let component: GlobalExpensesByCatComponent;
  let fixture: ComponentFixture<GlobalExpensesByCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalExpensesByCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalExpensesByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
