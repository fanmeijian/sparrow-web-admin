import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FlatTreeControl } from "@angular/cdk/tree";
import { LevelDynamicDatabase } from "../../model/level-database";
import { DynamicFlatNode } from "../../model/dynamic-flat-node";
import { DynamicDataSource } from "../../model/dynamic-datasource";
import { OrggroupCreateComponent } from "../orggroup-create/orggroup-create.component";
import { GroupDynamicDatabase } from "../../model/group-database";
import { GroupService, OrganizationService } from "@sparrowmini/org-api";
import { map, switchMap, zip } from "rxjs";
import { OrggroupMemberAddComponent } from "../orggroup-member-add/orggroup-member-add.component";

@Component({
  selector: "app-orggroups",
  templateUrl: "./orggroups.component.html",
  styleUrls: ["./orggroups.component.css",'../../org.css'],
})
export class OrggroupsComponent implements OnInit {
  constructor(
    database: GroupDynamicDatabase,
    private dialog: MatDialog,
    private orgService: OrganizationService,
    private levelService: GroupService
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
    this.dialog.open(OrggroupCreateComponent, { width: "90%" });
  }

  delete(item: any) {
    this.levelService.deleteOrgGroup([item.id]).subscribe(() => {
      // this.snack.open("删除成功！", "关闭");
    });
  }

  selectedItem: any;
  onItemClick(item: any) {
    if (item.type === "GROUP") {
      this.levelService
        .groupParentOrgs(item.id)
        .pipe(
          map((res) => res.content),
          switchMap((m: any) =>
            zip(...m.map((s: any) => this.orgService.org(s.id.organizationId)))
          )
        )
        .subscribe((res) => {
          this.selectedItem = Object.assign({}, item, { organizations: res });
        });
    }
  }

  edit(menu: any) {
    this.dialog.open(OrggroupCreateComponent, { width: "90%", data: menu });
  }

  openMember(group: any) {
    this.dialog.open(OrggroupMemberAddComponent, { data: group, width: "90%" });
  }
}
