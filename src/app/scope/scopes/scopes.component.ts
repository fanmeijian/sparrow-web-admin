import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ScopeService, SysconfigService, SysroleService } from '@sparrowmini/org-api';
import { combineLatest, map, of, switchMap, tap, zip } from 'rxjs';
import { SysroleCreateComponent } from '../../sysrole/sysrole-create/sysrole-create.component';
import { SysrolePermissionComponent } from '../../sysrole/sysrole-permission/sysrole-permission.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ScopeCreateComponent } from '../scope-create/scope-create.component';
import { ScopePermissionComponent } from '../scope-permission/scope-permission.component';
import { baseOpLogColumns } from '../../common/base-op-log-column/base-op-log-column.component';

@Component({
  selector: 'app-scopes',
  templateUrl: './scopes.component.html',
  styleUrls: ['./scopes.component.css'],
})
export class ScopesComponent implements OnInit {
  sync() {
    this.sysconfigService.synchronizeScope().subscribe(() => {
      this.snack.open('同步成功！', '关闭');
      this.ngOnInit();
    })
  }
  users: any[] = [];
  dataSource = new MatTableDataSource<any>();
  // pageable = { page: 0, size: 10 };

  total: number = 0;
  displayedColumns = ['id', 'name', 'code', 'users', 'sysroles', 'actions'];

  filters: any[] = [];
  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc'],
  };

  constructor(
    private scopeService: ScopeService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private sysroleService: SysroleService,
    private sysconfigService: SysconfigService,
  ) { }

  ngOnInit(): void {
    this.onPage(this.pageable);
  }

  new() {
    this.dialog.open(ScopeCreateComponent);
  }

  delete(sysrole: any) {
    this.scopeService.deleteScopes([sysrole.id]).subscribe(() => {
      this.ngOnInit();
      this.snack.open('删除成功！', '关闭');
    });
  }

  edit(sysrole: any) {
    this.dialog
      .open(ScopeCreateComponent, { data: sysrole })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.ngOnInit();
      });
  }

  remove(sysrole: any, scope: any) {
    this.scopeService
      .removeScopePermissions({ sysroles: [sysrole.id] }, scope.id)
      .subscribe(() => {
        this.snack.open('移除成功！', '关闭');
        this.ngOnInit();
      });
  }

  removeUser(user: any, scope: any) {
    this.scopeService
      .removeScopePermissions({ users: [user] }, scope.id)
      .subscribe(() => {
        this.snack.open('移除成功！', '关闭');
        this.ngOnInit();
      });
  }

  openPermission(sysrole: any) {
    this.dialog
      .open(ScopePermissionComponent, { data: sysrole })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snack.open('授权成功！', '关闭');
          this.onPage(this.pageable);
        }
      });
  }

  onPage(page: PageEvent) {
    this.dataSource = new MatTableDataSource<any>();
    this.scopeService
      .scopeFilter(
        this.filters,
        page.pageIndex,
        page.pageSize,
        this.pageable.sort
      )
      .pipe(
        tap((t) => (this.pageable.length = t.totalElements!)),
        map((res: any) => res.content),
        switchMap((sysroles: any[]) =>
          zip(
            ...sysroles.map((sysrole) => {
              const $users = this.scopeService
                .scopePermissions(sysrole.id, 'USER')
                .pipe(
                  map((m) =>
                    m.content && m.content.length > 0
                      ? m.content?.map((a) => a.id.username)
                      : m.content
                  )
                );
              const $sysroles = this.scopeService
                .scopePermissions(sysrole.id, 'SYSROLE')
                .pipe(
                  map((m) => m.content),
                  switchMap((res: any) =>
                    res.length > 0
                      ? zip(
                        ...res.map((m: any) =>
                          this.sysroleService.sysrole(m.id.sysroleId)
                        )
                      )
                      : of([])
                  )
                );

              return combineLatest($users, $sysroles).pipe(
                map((permissions: any) =>
                  Object.assign({}, sysrole, {
                    users: permissions[0],
                    sysroles: permissions[1],
                  })
                )
              );
            })
          )
        )
      )
      .subscribe((res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource<any>(res);
      });
  }

  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  applyFilter(event: any) {
    this.filters = event;
    this.pageable.pageIndex = 0;
    this.paginator.pageIndex = this.pageable.pageIndex;
    this.onPage({
      pageIndex: this.pageable.pageIndex,
      pageSize: this.pageable.pageSize,
      length: this.pageable.length,
    });
  }
}
