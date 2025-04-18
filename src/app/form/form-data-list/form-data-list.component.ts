import { S } from "@angular/cdk/keycodes";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit, Optional } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BASE_PATH, FormService } from "@sparrowmini/org-api";

@Component({
  selector: "app-form-data-list",
  templateUrl: "./form-data-list.component.html",
  styleUrls: ["./form-data-list.component.css"],
})
export class FormDataListComponent implements OnInit {
  createIndex(_t67: any) {
    this.http.post(this.basePath+"/forms/datas/" + _t67.id + "/index", _t67).subscribe();
  }
  dataSource = new MatTableDataSource<any>();
  pageable = { pageIndex: 0, pageSize: 10, length: 0, sort: ["createdDate,desc"] };
  formId?: string;

  displayedColumns = ["seq", "name", "form", "indexed", "code", "actions"];

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private http: HttpClient,
    @Optional() @Inject(BASE_PATH) private basePath: string,
  ) { }

  ngOnInit(): void {

    // this.formService
    //   .allFormDatas(this.pageable.page, this.pageable.size)
    //   .subscribe((res:any) => {
    //     this.dataSource = new MatTableDataSource<any>(res.content);
    //   });
    this.route.queryParams.subscribe((params: any) => {
      if (params.formId) {
        this.formId = params.formId
      }
      this.onPageChange(this.pageable)
    })
  }

  onPageChange(e: PageEvent) {
    this.pageable.pageIndex = e.pageIndex
    this.pageable.pageSize = e.pageSize
    if (this.formId) {
      this.formService.formDatas(this.formId, this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res.content);
        this.pageable.length = res.totalElements!
      })
    } else {
      this.formService.allFormDatas(this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res.content);
        this.pageable.length = res.totalElements!
      })
    }

  }
}
