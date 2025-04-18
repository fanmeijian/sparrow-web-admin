import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormService } from "@sparrowmini/org-api";

@Component({
  selector: "app-my-form-list",
  templateUrl: "./my-form-list.component.html",
  styleUrls: ["./my-form-list.component.css"],
})
export class MyFormListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  pageable = { page: 0, size: 10 };

  displayedColumns = ["id", "name", "code", "actions"];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.formService
      .dataForms(this.pageable.page, this.pageable.size)
      .subscribe((res:any) => {
        this.dataSource = new MatTableDataSource<any>(res.content);
      });
  }
}
