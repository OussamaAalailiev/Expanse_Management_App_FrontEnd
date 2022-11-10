import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalIncomesComponent } from './total-incomes.component';

describe('TotalIncomesComponent', () => {
  let component: TotalIncomesComponent;
  let fixture: ComponentFixture<TotalIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalIncomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
