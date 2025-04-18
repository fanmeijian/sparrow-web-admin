import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormListComponent } from './my-form-list.component';

describe('MyFormListComponent', () => {
  let component: MyFormListComponent;
  let fixture: ComponentFixture<MyFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFormListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
