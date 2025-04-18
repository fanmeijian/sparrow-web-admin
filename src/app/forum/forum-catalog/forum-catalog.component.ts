import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';
import { ForumService } from '@sparrowmini/org-api';
import { TreeNode, FlatNode } from '../../model/TreeConstant';
import { NewTreeComponent } from '../../common/new-tree/new-tree.component';

@Component({
  selector: 'app-forum-catalog',
  templateUrl: './forum-catalog.component.html',
  styleUrls: ['./forum-catalog.component.css', '../../org.css']
})
export class ForumCatalogComponent implements OnInit {
  newCatalog() {
    this.dialog.open(NewTreeComponent, { data: this.dataSource.data }).afterClosed().subscribe(res => {
      if (res) {
        this.forumService.saveForumCatalog(res).subscribe(res => { })

      }
    })
  }


  pageable = { pageIndex: 0, pageSize: 10, length: 0 };

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      code: node.code,
      id: node.id,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
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
    private dialog: MatDialog,
    private router: Router,
    private forumService: ForumService
  ) {

  }
  ngOnInit(): void {
    this.forumService.getForumCatalogTree().subscribe((res: any) => {
      this.dataSource.data = res
      localStorage.setItem('forum-tree', JSON.stringify(res))
    })

  }

  hasChild = (_: number, node: FlatNode) => node.expandable;
}
