import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FlatTreeControl } from "@angular/cdk/tree";
import { LevelCreateComponent } from "../level-create/level-create.component";
import { LevelDynamicDatabase } from "../../model/level-database";
import { DynamicFlatNode } from "../../model/dynamic-flat-node";
import { DynamicDataSource } from "../../model/dynamic-datasource";
import { JoblevelService, OrganizationService } from "@sparrowmini/org-api";
import { switchMap, zip } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-levels",
  templateUrl: "./levels.component.html",
  styleUrls: ["./levels.component.css",'../../org.css'],
})
export class LevelsComponent implements OnInit {
  constructor(
    private database: LevelDynamicDatabase,
    private dialog: MatDialog,
    private levelService: JoblevelService,
    private orgService: OrganizationService,
    private snack: MatSnackBar
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    database.initialData().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit(): void {}

  new() {
    this.dialog
      .open(LevelCreateComponent, { width: "90%" })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.database.initialData().subscribe((res) => {
            this.dataSource.data = res;
          });
        }
      });
  }

  delete(item: any) {
    this.levelService.deleteLevel([item.id]).subscribe(() => {
      this.database.initialData().subscribe((res) => {
        this.dataSource.data = res;
      });
      this.snack.open("删除成功！", "关闭");
    });
  }

  selectedItem: any;
  onItemClick(item: any) {
    if (item.type === "LEVEL") {
      this.levelService
        .levelParentOrgs(item.id)
        .pipe(
          switchMap((m) => zip(...m.map((s) => this.orgService.org(s.id!))))
        )
        .subscribe((res) => {
          this.selectedItem = Object.assign({}, item, { organizations: res });
          // console.log(this.selectedItem);
        });
    }
  }

  edit(menu: any) {
    this.dialog
      .open(LevelCreateComponent, { width: "90%", data: menu })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.database.initialData().subscribe((res) => {
            this.dataSource.data = res;
          });
        }

        // this.snack.open("操作成功！", "关闭");
      });
  }
}
