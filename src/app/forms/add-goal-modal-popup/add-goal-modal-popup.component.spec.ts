import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGoalModalPopupComponent } from './add-goal-modal-popup.component';

describe('AddGoalModalPopupComponent', () => {
  let component: AddGoalModalPopupComponent;
  let fixture: ComponentFixture<AddGoalModalPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGoalModalPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
