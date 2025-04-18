import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '@sparrowmini/org-api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css'],
})
export class ViewReportComponent implements OnInit {
  applyFilter($event: import("@sparrowmini/org-api").SparrowJpaFilter[]) {
    let a:any = {filters: this.filters}
    this.route.queryParams.subscribe((params: any) => {
      if (params.templateId) {
        this.templateId = params.templateId;
        this.reportService
          .exportReportByFilter('HTML',this.templateId!,a)
          .subscribe((res: any) => {
            res.text().then((text: any) => {
              this.reportHtmlStr = this.sanitizer.bypassSecurityTrustHtml(text);
            });
          });
      }
    });
  }
  export(arg0: string) {
    let a:any = {filters: this.filters}
    this.reportService
      .exportReportByFilter(arg0, this.templateId!, a)
      .subscribe((res: any) => {
        let downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      });
  }
  reportHtmlStr: any;
  templateId?: string;

  filters: [] = []
  fields: [] = []



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private reportService: ReportService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params.templateId) {
        this.templateId = params.templateId;
        this.reportService
          .exportReport(this.templateId!, 'HTML')
          .subscribe((res: any) => {
            res.text().then((text: any) => {
              this.reportHtmlStr = this.sanitizer.bypassSecurityTrustHtml(text);
            });
          });
      }
    });
  }

  exportPdf() {
    this.reportService
      .exportReport(this.templateId!, 'PDF')
      .subscribe((res: any) => {
        let downloadURL = URL.createObjectURL(res);
        window.open(downloadURL);
      });
  }
}
