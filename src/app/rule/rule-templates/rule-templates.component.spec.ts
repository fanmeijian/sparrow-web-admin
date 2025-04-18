import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleTemplatesComponent } from './rule-templates.component';

describe('RuleTemplatesComponent', () => {
  let component: RuleTemplatesComponent;
  let fixture: ComponentFixture<RuleTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
