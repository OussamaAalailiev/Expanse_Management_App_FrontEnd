import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTotalBalanceComponent } from './user-total-balance.component';

describe('UserTotalBalanceComponent', () => {
  let component: UserTotalBalanceComponent;
  let fixture: ComponentFixture<UserTotalBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTotalBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTotalBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
