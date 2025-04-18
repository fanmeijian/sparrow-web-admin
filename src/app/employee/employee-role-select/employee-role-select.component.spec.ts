import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleSelectComponent } from './employee-role-select.component';

describe('EmployeeRoleSelectComponent', () => {
  let component: EmployeeRoleSelectComponent;
  let fixture: ComponentFixture<EmployeeRoleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRoleSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
