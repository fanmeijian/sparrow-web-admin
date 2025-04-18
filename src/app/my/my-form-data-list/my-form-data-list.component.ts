import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormService } from "@sparrowmini/org-api";

@Component({
  selector: "app-my-form-data-list",
  templateUrl: "./my-form-data-list.component.html",
  styleUrls: ["./my-form-data-list.component.css"],
})
export class MyFormDataListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  pageable = { page: 0, size: 10 };
  formId: string = "";

  displayedColumns = ["id", "name", "code", "actions"];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService
      .formDatas(this.formId, this.pageable.page, this.pageable.size)
      .subscribe((res:any) => {
        this.dataSource = new MatTableDataSource<any>(res.content);
      });
  }
}
