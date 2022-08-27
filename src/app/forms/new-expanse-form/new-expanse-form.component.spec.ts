import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpanseFormComponent } from './new-expanse-form.component';

describe('NewExpanseFormComponent', () => {
  let component: NewExpanseFormComponent;
  let fixture: ComponentFixture<NewExpanseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpanseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpanseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
