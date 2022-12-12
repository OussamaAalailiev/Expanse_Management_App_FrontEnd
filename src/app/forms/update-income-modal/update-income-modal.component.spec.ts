import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncomeModalComponent } from './update-income-modal.component';

describe('UpdateIncomeModalComponent', () => {
  let component: UpdateIncomeModalComponent;
  let fixture: ComponentFixture<UpdateIncomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIncomeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIncomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
