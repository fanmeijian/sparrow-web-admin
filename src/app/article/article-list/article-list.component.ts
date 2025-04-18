import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BASE_PATH, CmsService } from '@sparrowmini/org-api';
import { FilterTreeComponent } from '../../common/filter-tree/filter-tree.component';
import { NewTreeComponent } from '../../common/new-tree/new-tree.component';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css', '../../org.css']
})
export class ArticleListComponent implements OnInit {

  deleteArticle(_t123: any) {
    this.cmsService.deleteArticle([_t123.id]).subscribe(res => {
      this.onPageChange(this.pageable)
    })

  }


  onPageChange($event: PageEvent) {
    this.pageable.pageIndex = $event.pageIndex;
    this.pageable.pageSize = $event.pageSize;
    this.route.params.subscribe((params: any) => {
      this.cmsService.articleByCatalogFilter([], params.id, this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe((res: any) => {
        this.dataSource = res.content
        this.pageable.length = res.totalElements
      })
    })

  }

  displayedColumns = ['seq', 'title', 'attachment', 'action'];
  dataSource = [];
  pageable = { pageIndex: 0, pageSize: 10, length: 0, sort: ['createdDate,desc'] };


  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) private apiBase: string,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private cmsService: CmsService
  ) {

  }

  ngOnInit(): void {
    this.onPageChange(this.pageable)

  }

}


