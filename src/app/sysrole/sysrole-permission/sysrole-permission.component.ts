import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService, SysroleService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-sysrole-permission',
  templateUrl: './sysrole-permission.component.html',
  styleUrls: ['./sysrole-permission.component.css'],
})
export class SysrolePermissionComponent implements OnInit {
  selectedUsernames: any[] = [];
  users: string = '';

  fg: FormGroup = this.fb.group({
    users: this.fb.array([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sysroleService: SysroleService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
  }

  submit() {
    this.sysroleService
      .addSysroleUsers(
        this.selectedUsernames.map((m) => m.username),
        this.data.id
      )
      .subscribe(()=>this.snack.open('授权成功！','关闭'));
  }
}
