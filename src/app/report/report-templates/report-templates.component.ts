import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService, SysroleService } from '@sparrowmini/org-api';
import { tap, map, switchMap, zip } from 'rxjs';
import { DataPermissionGrantComponent } from '../../data-permission/data-permission-grant/data-permission-grant.component';
import { SysroleCreateComponent } from '../../sysrole/sysrole-create/sysrole-create.component';
import { SysrolePermissionComponent } from '../../sysrole/sysrole-permission/sysrole-permission.component';
import { ReportTemplateCreateComponent } from '../report-template-create/report-template-create.component';

@Component({
  selector: 'app-report-templates',
  templateUrl: './report-templates.component.html',
  styleUrls: ['./report-templates.component.css'],
})
export class ReportTemplatesComponent implements OnInit {
  users: any[] = [];
  dataSource = new MatTableDataSource<any>();
  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc'],
  };

  displayedColumns = ['seq', 'name', 'code', 'users', 'actions'];


  constructor(
    private sysroleService: ReportService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private http: HttpClient
  ) {}

  filters: any[] = [];
  ngOnInit(): void {
    this.onPageChange(this.pageable);
  }

  applyFilter() {
    this.onPageChange({ pageIndex: 0, pageSize: this.pageable.pageSize });
  }

  onPageChange(event: any) {
    // console.log(event);
    this.dataSource = new MatTableDataSource<any>();
    this.pageable.pageIndex = event.pageIndex;
    this.pageable.pageSize = event.pageSize;
    this.sysroleService
      .reportTemplates(
        this.filters,
        this.pageable.pageIndex,
        this.pageable.pageSize
      )
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<any>(res.content);
        this.pageable.length = res.totalElements!;
      });
  }

  new() {
    this.dialog
      .open(ReportTemplateCreateComponent,{width:'80%'})
      .afterClosed()
      .subscribe((result) => {
        if (result) this.ngOnInit();
      });
  }

  delete(sysrole: any) {
    this.sysroleService.deleteReportTemplate([sysrole.id]).subscribe(() => {
      this.snack.open('删除成功！', '关闭');
    });
  }

  edit(sysrole: any) {
    this.dialog
      .open(ReportTemplateCreateComponent, { data: sysrole , width:'80%'})
      .afterClosed()
      .subscribe((result) => {
        if (result) this.onPageChange(this.pageable);
      });
  }

  remove(user: any, sysrole: any) {
    // this.sysroleService.removeSysroleUsers([user], sysrole.id).subscribe(() => {
    //   this.snack.open('移除成功！', '关闭');
    //   this.ngOnInit();
    // });
  }

  openPermission(sysrole: any) {
    this.dialog
      .open(SysrolePermissionComponent, { data: sysrole, width: '80%' })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.ngOnInit();
        }
      });
  }

  openDataPermission(sysrole: any) {
    this.dialog
      .open(DataPermissionGrantComponent, {
        data: sysrole,
        width: '80%',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.ngOnInit();
        }
      });
  }
}
