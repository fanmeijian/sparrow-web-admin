import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {
  PageElementService,
  SysrolePageElementId,
  SysroleService,
  UserPageElementId,
} from '@sparrowmini/org-api';
import { tap, map, switchMap, zip, of, combineLatest } from 'rxjs';
import { ScopeCreateComponent } from '../../scope/scope-create/scope-create.component';
import { ScopePermissionComponent } from '../../scope/scope-permission/scope-permission.component';
import { PageElementCreateComponent } from '../page-element-create/page-element-create.component';
import { PageElementPermissionComponent } from '../page-element-permission/page-element-permission.component';

@Component({
  selector: 'app-page-elements',
  templateUrl: './page-elements.component.html',
  styleUrls: ['./page-elements.component.css'],
})
export class PageElementsComponent implements OnInit {
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
    private scopeService: PageElementService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private sysroleService: SysroleService
  ) {}

  ngOnInit(): void {
    this.onPage(this.pageable);
  }

  new() {
    this.dialog.open(PageElementCreateComponent);
  }

  delete(sysrole: any) {
    this.scopeService.deletePageElement([sysrole.id]).subscribe(() => {
      this.ngOnInit();
      this.snack.open('删除成功！', '关闭');
    });
  }

  edit(sysrole: any) {
    this.dialog
      .open(PageElementCreateComponent, { data: sysrole })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.ngOnInit();
      });
  }

  remove(sysroles: SysrolePageElementId[], users: UserPageElementId[]) {
    this.scopeService
      .removePageElementPermission({
        sysrolePermissions: sysroles,
        userPermissions: users,
      })
      .subscribe(() => {
        this.snack.open('移除成功！', '关闭');
        this.ngOnInit();
      });
  }

  openPermission(sysrole: any) {
    this.dialog
      .open(PageElementPermissionComponent, { data: sysrole })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.snack.open('授权成功！', '关闭');
          // this.onPage(this.pageable);
        }
      });
  }

  onPage(page: PageEvent) {
    this.dataSource = new MatTableDataSource<any>();
    this.scopeService
      .pageElements(
        this.filters,
        page.pageIndex,
        page.pageSize,
        this.pageable.sort
      )
      .pipe(
        tap((t) => (this.pageable.length = t.totalElements!)),
        map((res: any) => res?.content),
        switchMap((sysroles: any[]) =>
          zip(
            ...sysroles.map((sysrole) => {
              const $users = this.scopeService
                .pageElementPermissions(sysrole.id, 'USER')
                .pipe(
                  map((m) =>
                    m?.content && m?.content.length > 0
                      ? m?.content?.map((a) => a.id)
                      : m?.content
                  )
                );
              const $sysroles = this.scopeService
                .pageElementPermissions(sysrole.id, 'SYSROLE')
                .pipe(
                  map((m) => m?.content),
                  switchMap((res: any) =>
                    res?.length > 0
                      ? zip(
                          ...res.map((m: any) =>
                            this.sysroleService
                              .sysrole(m.id.sysroleId)
                              .pipe(
                                map((ms) => Object.assign({}, m, { name: ms.name }))
                              )
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
        console.log(res);
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
