import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { CmsService, ForumService } from '@sparrowmini/org-api';
import { FlatNode, TreeNode } from '../../model/TreeConstant';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ForumFormComponent } from '../forum-form/forum-form.component';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  onPageChange($event: PageEvent) {
    throw new Error('Method not implemented.');
  }
  catalogId: string;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['seq', 'title', 'attachment', 'action'];
  ForumForm = ForumFormComponent

  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc']
  }
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private cmsService: ForumService,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      if (params.catalogId) {
        this.catalogId = params.catalogId
        this.cmsService.forumList(params.catalogId, this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe((res: any) => {
          this.dataSource = res.content
          this.pageable.length = res.totalElements
        })
      }

    })

  }
}

