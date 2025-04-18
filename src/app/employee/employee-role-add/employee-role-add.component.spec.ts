import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRoleAddComponent } from './employee-role-add.component';

describe('EmployeeRoleAddComponent', () => {
  let component: EmployeeRoleAddComponent;
  let fixture: ComponentFixture<EmployeeRoleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRoleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
