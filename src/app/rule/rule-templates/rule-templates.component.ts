import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RuleService } from '@sparrowmini/org-api';

@Component({
  selector: 'spr-rule-templates',
  templateUrl: './rule-templates.component.html',
  styleUrls: ['./rule-templates.component.css']
})
export class RuleTemplatesComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  // pageable = { page: 0, size: 10 };

  total: number = 0;
  displayedColumns = ['seq', 'stat', 'name', 'amount', "description","createdDate"];

  filters: any[] = [];
  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc'],
  };


  constructor(
    private dataService: RuleService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.onPage(this.pageable)
    console.log('====')
  }

  onPage(page: PageEvent) {
    this.pageable.pageIndex = page.pageIndex
    this.pageable.pageSize = page.pageSize
    this.dataService.ruleList(this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.content)
      this.pageable.length = res.totalElements!
    })
  }
}
