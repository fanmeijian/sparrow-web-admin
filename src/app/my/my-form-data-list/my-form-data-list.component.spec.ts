import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormDataListComponent } from './my-form-data-list.component';

describe('MyFormDataListComponent', () => {
  let component: MyFormDataListComponent;
  let fixture: ComponentFixture<MyFormDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFormDataListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
