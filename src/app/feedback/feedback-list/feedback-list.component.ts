import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comment, FeedbackService, SparrowJpaFilter } from '@sparrowmini/org-api';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  delete(id: string) {
    this.dataService.deleteFeedback([id]).subscribe(() => {
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
    private dataService: FeedbackService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.onPage(this.pageable)
  }

  onPage(page: PageEvent) {
    this.pageable.pageIndex = page.pageIndex
    this.pageable.pageSize = page.pageSize
    this.dataService.feedbacks(this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res.content)
      this.pageable.length = res.totalElements!
    })
  }
}
