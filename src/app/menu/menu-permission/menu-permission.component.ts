import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Menu,
  MenuService,
  Sysrole,
  SysroleMenuId,
  User,
  UserMenuId,
} from '@sparrowmini/org-api';

@Component({
  selector: 'app-menu-permission',
  templateUrl: './menu-permission.component.html',
  styleUrls: ['./menu-permission.component.css'],
})
export class MenuPermissionComponent implements OnInit {
  selectedSysroles: any[] = [];
  selectedUsernames: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuService: MenuService,
    private dialogRef: MatDialogRef<MenuPermissionComponent>,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  submit() {
    let userMenus: UserMenuId[] = [];
    let sysroleMenus: SysroleMenuId[] = [];
    let menus = this.data.forEach((m: Menu) => {
      userMenus.push(
        ...this.selectedUsernames.map((user: User) =>
          Object.assign({}, { username: user.username, menuId: m.id })
        )
      );

      sysroleMenus.push(
        ...this.selectedSysroles.map((sysrole: Sysrole) =>
          Object.assign({}, { sysroleId: sysrole.id, menuId: m.id })
        )
      );
    });
    this.menuService
      .addMenuPermissions({
        userMenuPKs: userMenus,
        sysroleMenuPKs: sysroleMenus,
      })
      .subscribe(() => {
        this.dialogRef.close(true)
      });
  }
}
