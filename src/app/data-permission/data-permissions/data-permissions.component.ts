import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DataPermissionService, SysroleService } from '@sparrowmini/org-api';
import { map, switchMap, tap, zip } from 'rxjs';

@Component({
  selector: 'app-data-permissions',
  templateUrl: './data-permissions.component.html',
  styleUrls: ['./data-permissions.component.css'],
})
export class DataPermissionsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  pageable = { pageIndex: 0, pageSize: 10, length: 0 , sort: []};

  displayedColumns = ['seq','name', 'remark','permission'];

  constructor(
    private dataPermissionService: DataPermissionService,
    private sysroleService: SysroleService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.onPageChange(this.pageable);
  }

  onPageChange(event: PageEvent) {
    this.pageable.pageIndex =event.pageIndex
    this.pageable.pageSize = event.pageSize
    this.dataPermissionService
      .dataPermissions(this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource<any>(res.content);
        this.pageable.length = res.totalElements;
      });
  }
}
