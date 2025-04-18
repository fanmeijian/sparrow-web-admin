import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUserAddComponent } from './employee-user-add.component';

describe('EmployeeUserAddComponent', () => {
  let component: EmployeeUserAddComponent;
  let fixture: ComponentFixture<EmployeeUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeUserAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
