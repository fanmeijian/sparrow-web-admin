import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { BASE_PATH, CmsService } from '@sparrowmini/org-api';
import { NewTreeComponent } from '../../common/new-tree/new-tree.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCatalogService } from './article-catalog.service';

@Component({
  selector: 'app-article-catalog',
  templateUrl: './article-catalog.component.html',
  styleUrls: ['./article-catalog.component.css', '../../org.css']
})
export class ArticleCatalogComponent implements OnInit {



  onNodeActivate(node: ExampleFlatNode, isActive: any) {
    // console.log('onNodeActivate', node, isActive)
    if (isActive) {
      // Expand the node when it becomes active
      this.treeControl.expand(node);

      // Optionally expand parent nodes
      let parent = this.getParentNode(node);
      while (parent) {
        this.treeControl.expand(parent);
        parent = this.getParentNode(parent);
      }
    }
  }

  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentIndex = this.treeControl.dataNodes.indexOf(node);
    if (currentIndex > 0) {
      for (let i = currentIndex - 1; i >= 0; i--) {
        const potentialParent = this.treeControl.dataNodes[i];
        if (potentialParent.level < node.level) {
          return potentialParent;
        }
      }
    }
    return null;
  }

  saveCatalog() {
    this.cmsService.updateArticleCatalog({ name: this.selectedMenu.name }, this.selectedMenu.id).subscribe(res => {
      this.editCatalog = false
    })

  }

  editCatalog = false;
  catalogName: string;

  delete(_t17: any) {
    this.cmsService.deleteArticleCatalog(_t17.id).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter((item: any) => item.id != _t17.id)
    })
  }
  catalogId: string;

  newCatalog() {
    this.dialog.open(NewTreeComponent, { data: this.dataSource.data }).afterClosed().subscribe(res => {
      if (res) {
        this.cmsService.saveArticleCatalog(res).subscribe(res => { })

      }
    })
  }
  onNodeClick(_t14: any) {
    // this.selectedMenu = _t14;
    // console.log('onNodeClick', _t14)
    this.router.navigateByUrl('/admin/article-catalog/article-list', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/admin/article-catalog/article-list']);
    });
    // this.router.navigate(['/admin/article-catalog/article-list'], { queryParams: { catalogId: this.selectedMenu.id } })
    // this.onPageChange(this.pageable)
  }
  onPageChange($event: PageEvent) {
    this.http.post(this.apiBase + '/cms/article/article-catalog/' + this.selectedMenu.id + '/article-filter', [], { params: new HttpParams({ fromObject: this.pageable }) }).subscribe((res: any) => {
      this.dataSource2 = res.content
      this.pageable.length = res.totalElements
    })
  }

  displayedColumns = ['seq', 'title', 'attachment', 'action'];
  dataSource2 = [];
  pageable = { pageIndex: 0, pageSize: 10, length: 0 };


  selectedMenu: any;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      code: node.code,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) private apiBase: string,
    private dialog: MatDialog,
    private router: Router,
    private cmsService: CmsService,
    public articleCatalogTreeService: ArticleCatalogService,
  ) {

  }
  ngOnInit(): void {
    this.cmsService.getArticleCatalogTree().subscribe((res: any) => {
      this.dataSource.data = res
      localStorage.setItem('article-catalog-tree', JSON.stringify(res))
    })
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  id: string;
  code: string;
  children?: FoodNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


export interface PeriodicElement {
  title: string;
  position: number;
  weight: number;
  symbol: string;
}

