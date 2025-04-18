import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrganizationService, RoleService } from "@sparrowmini/org-api";
import { zip } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DynamicDataSource } from "../../model/dynamic-datasource";
import { DynamicFlatNode } from "../../model/dynamic-flat-node";
import { RoleDynamicDatabase } from "../../model/role-database";
import { RoleCreateComponent } from "../role-create/role-create.component";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css","../../org.css"],
})
export class RolesComponent implements OnInit {
  selectedItem: any;
  onItemClick(item: any) {
    if (item.type === "ROLE") {
      this.roleService
        .roleParentOrgs(item.id)
        .pipe(
          switchMap((m) =>
            zip(...m.map((s) => this.orgService.org(s.id?.organizationId!)))
          )
        )
        .subscribe((res) => {
          this.selectedItem = Object.assign({}, item, { organizations: res });
        });
    }
  }

  constructor(
    private database: RoleDynamicDatabase,
    private dialog: MatDialog,
    private roleService: RoleService,
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
      .open(RoleCreateComponent, { width: "90%" })
      .afterClosed()
      .subscribe(() => {
        this.database.initialData().subscribe((res) => {
          this.dataSource.data = res;
        });
      });
  }

  delete(selectedItem: any) {
    this.roleService.deleteRole([selectedItem.id]).subscribe(() => {
      this.snack.open("操作成功！", "关闭");
      this.database.initialData().subscribe((res) => {
        this.dataSource.data = res;
      });
    });
  }

  deleteMenu(selectedItem: any) {
    this.roleService.deleteRole([selectedItem.id]).subscribe(() => {
      this.snack.open("操作成功！", "关闭");
      this.database.initialData().subscribe((res) => {
        this.dataSource.data = res;
      });
    });
  }

  edit(menu: any) {
    this.dialog
      .open(RoleCreateComponent, { width: "90%", data: menu })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.database.initialData().subscribe((res) => {
            this.dataSource.data = res;
          });
        }
      });
  }
}
