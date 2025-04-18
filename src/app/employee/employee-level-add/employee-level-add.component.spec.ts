import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLevelAddComponent } from './employee-level-add.component';

describe('EmployeeLevelAddComponent', () => {
  let component: EmployeeLevelAddComponent;
  let fixture: ComponentFixture<EmployeeLevelAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLevelAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLevelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
