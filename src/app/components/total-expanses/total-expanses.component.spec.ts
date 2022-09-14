import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalExpansesComponent } from './total-expanses.component';

describe('TotalExpansesComponent', () => {
  let component: TotalExpansesComponent;
  let fixture: ComponentFixture<TotalExpansesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalExpansesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalExpansesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
