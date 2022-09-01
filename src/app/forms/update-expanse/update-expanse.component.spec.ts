import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExpanseComponent } from './update-expanse.component';

describe('UpdateExpanseComponent', () => {
  let component: UpdateExpanseComponent;
  let fixture: ComponentFixture<UpdateExpanseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExpanseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExpanseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
