import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrggroupMemberAddComponent } from './orggroup-member-add.component';

describe('OrggroupMemberAddComponent', () => {
  let component: OrggroupMemberAddComponent;
  let fixture: ComponentFixture<OrggroupMemberAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrggroupMemberAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrggroupMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
