import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectionComponent } from './employee-selection.component';

describe('EmployeeSelectionComponent', () => {
  let component: EmployeeSelectionComponent;
  let fixture: ComponentFixture<EmployeeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
