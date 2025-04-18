import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExportToolbarComponent } from './report-export-toolbar.component';

describe('ReportExportToolbarComponent', () => {
  let component: ReportExportToolbarComponent;
  let fixture: ComponentFixture<ReportExportToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportExportToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExportToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
