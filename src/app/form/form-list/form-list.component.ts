import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { FormPreviewComponent } from "../form-preview/form-preview.component";
import { PageEvent } from "@angular/material/paginator";
import { FormService } from "@sparrowmini/org-api";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.css"],
})
export class FormListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  pageable = { pageIndex: 0, pageSize: 10, length: 0 };

  displayedColumns = ["seq", "name", "code","update", "actions"];

  constructor(private formService: FormService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.onPage(this.pageable)
  }
  preview(element:any){
    this.dialog.open(FormPreviewComponent, {width:"80%", data: JSON.parse(element.form)})
  }

  onPage(e: PageEvent){
    this.pageable.pageIndex=e.pageIndex
    this.pageable.pageSize=e.pageSize
    this.formService
    .dataForms(this.pageable.pageIndex, this.pageable.pageSize)
    .subscribe((res) => {
      this.dataSource = new MatTableDataSource<any>(res.content);
      this.pageable.length=res.totalElements!
    });
  }
}
