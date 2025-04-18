import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrggroupsComponent } from './orggroups.component';

describe('OrggroupsComponent', () => {
  let component: OrggroupsComponent;
  let fixture: ComponentFixture<OrggroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrggroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrggroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
