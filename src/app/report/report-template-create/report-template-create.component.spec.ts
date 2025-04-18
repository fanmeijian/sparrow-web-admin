import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTemplateCreateComponent } from './report-template-create.component';

describe('ReportTemplateCreateComponent', () => {
  let component: ReportTemplateCreateComponent;
  let fixture: ComponentFixture<ReportTemplateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportTemplateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTemplateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
