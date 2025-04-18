import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FlatTreeControl } from "@angular/cdk/tree";
import { EmployeeCreateComponent } from "../employee-create/employee-create.component";
import { LevelDynamicDatabase } from "../../model/level-database";
import { DynamicFlatNode } from "../../model/dynamic-flat-node";
import { DynamicDataSource } from "../../model/dynamic-datasource";
import {
  EmployeeService,
  GroupService,
  JoblevelService,
  OrganizationService,
  RoleService,
} from "@sparrowmini/org-api";
import { combineLatest, map, of, switchMap, zip } from "rxjs";
import { EmployeeDynamicDatabase } from "../../model/employee-database";
import { EmployeeRoleAddComponent } from "../employee-role-add/employee-role-add.component";
import { EmployeeLevelAddComponent } from "../employee-level-add/employee-level-add.component";
import { EmployeeUserAddComponent } from "../employee-user-add/employee-user-add.component";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css",'../../org.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(
    database: EmployeeDynamicDatabase,
    private dialog: MatDialog,
    private orgService: OrganizationService,
    private employeeService: EmployeeService,
    private roleServic: RoleService,
    private levelService: JoblevelService,
    private groupService: GroupService
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
    this.dialog.open(EmployeeCreateComponent, { width: "90%" });
  }


  delete(selectedItem:any) {
    // console.log(this.checklistSelection.selected);
    this.employeeService.deleteEmployee([selectedItem.id]).subscribe()
  }

  selectedItem: any;
  onItemClick(item: any) {
    if (item.type === "EMPLOYEE") {
      // this.levelService
      //   .employeeParent(item.id)
      //   .pipe(
      //     switchMap((m) => zip(...m.map((s) => this.orgService.org(s.id!))))
      //   )
      //   .subscribe((res) => {
      //     this.selectedItem = Object.assign({}, item, { organizations: res });
      //     console.log(this.selectedItem);
      //   });
      const $org = this.orgService.org(item.organizationId);

      const $roles = this.employeeService.employeeRoles(item.id).pipe(
        map((res) => res.map((m) => m.id?.organizationRoleId)),
        switchMap((s) =>
          s.length > 0
            ? zip(
                ...s.map((m) => {
                  const $org = this.orgService.org(m?.organizationId!);
                  const $role = this.roleServic.role(m?.roleId!);
                  return combineLatest($org, $role).pipe(
                    map((r) =>
                      Object.assign({}, m, { organization: r[0], role: r[1] })
                    )
                  );
                })
              )
            : of([])
        )
      );
      const $levels = this.employeeService.employeeLevels(item.id).pipe(
        map((res) => res.map((m) => m.id?.organizationLevelId)),
        switchMap((s) =>
          s.length > 0
            ? zip(
                ...s.map((m) => {
                  const $org = this.orgService.org(m?.organizationId!);
                  const $level = this.levelService.level(m?.positionLevelId!);
                  return combineLatest($org, $level).pipe(
                    map((r) =>
                      Object.assign({}, m, { organization: r[0], level: r[1] })
                    )
                  );
                })
              )
            : of([])
        )
      );

      const $groups = this.employeeService.employeeGroups(item.id).pipe(
        map((res) => res.map((a) => a.id)),
        switchMap((s) =>
          s.length > 0
            ? zip(...s.map((m) => this.groupService.orgGroup(m?.groupId!)))
            : of([])
        )
      );

      const $users = this.employeeService.empolyeeUsers(item.id)

      combineLatest($org, $roles, $levels, $groups,$users).subscribe((s) => {
        this.selectedItem = Object.assign({}, item, {
          organization: s[0],
          roles: s[1],
          levels: s[2],
          groups: s[3],
          users: s[4]
        });
      });
    }
  }

  edit(menu: any) {
    // this.dialog.open(MenuCreateComponent, { width: "90%", data: menu.me });
  }

  openRole(role: any) {
    this.dialog.open(EmployeeRoleAddComponent, { width: "90%", data: role });
  }

  openLevel(role: any) {
    this.dialog.open(EmployeeLevelAddComponent, { width: "90%", data: role });
  }

  openUsername(item: any){
    this.dialog.open(EmployeeUserAddComponent, { width: "90%", data: item })
  }
}
