import { Component, Input, OnInit } from '@angular/core';
import { ReportService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-report-export-toolbar',
  templateUrl: './report-export-toolbar.component.html',
  styleUrls: ['./report-export-toolbar.component.css']
})
export class ReportExportToolbarComponent implements OnInit {
  @Input() templateId?: string;
  @Input() filters: any[] = []
  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit(): void {
  }

  export(arg0: string) {
    let a: any = { filters: this.filters }
    this.reportService
      .exportReportByFilter(arg0, this.templateId!, a)
      .subscribe((res:any) => {
        let downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      });
  }
}
