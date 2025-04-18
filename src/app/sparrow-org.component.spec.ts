import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparrowOrgComponent } from './sparrow-org.component';

describe('SparrowOrgComponent', () => {
  let component: SparrowOrgComponent;
  let fixture: ComponentFixture<SparrowOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparrowOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparrowOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
