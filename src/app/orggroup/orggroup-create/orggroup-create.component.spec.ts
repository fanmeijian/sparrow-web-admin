import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrggroupCreateComponent } from './orggroup-create.component';

describe('OrggroupCreateComponent', () => {
  let component: OrggroupCreateComponent;
  let fixture: ComponentFixture<OrggroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrggroupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrggroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
