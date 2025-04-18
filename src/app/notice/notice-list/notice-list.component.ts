import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NoticeService, SparrowJpaFilter } from '@sparrowmini/org-api';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  updateStat(id: string,arg0: string) {
    this.dataService.updateNoticeStatus(id, arg0).subscribe(()=>this.ngOnInit());
  }
  delete(id: string) {
    this.dataService.deleteNotice([id]).subscribe(() => {
      this.ngOnInit()
    })
  }

  dataSource = new MatTableDataSource<any>();
  // pageable = { page: 0, size: 10 };

  total: number = 0;
  displayedColumns = ['seq', 'stat', 'name', 'amount', "createdDate", "actions"];

  filters: SparrowJpaFilter[] = [];
  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc'],
  };


  constructor(
    private dataService: NoticeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.onPage(this.pageable)
  }

  onPage(page: PageEvent) {
    this.pageable.pageIndex = page.pageIndex
    this.pageable.pageSize = page.pageSize
    this.dataService.notices(this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.content)
      this.pageable.length = res.totalElements!
    })
  }
}
