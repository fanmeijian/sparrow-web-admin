import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService, UserService } from '@sparrowmini/org-api';
import { SysroleCreateComponent } from '../../sysrole/sysrole-create/sysrole-create.component';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-employee-user-add',
  templateUrl: './employee-user-add.component.html',
  styleUrls: ['./employee-user-add.component.css'],
})
export class EmployeeUserAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<SysroleCreateComponent>
  ) {}

  ngOnInit(): void {}

  selectedUsers = [];

  submit() {
    // console.log(this.selectedUsers)
    this.employeeService
      .addEmpolyeeUsers(
        this.selectedUsers.map((m:any) => m.username),
        this.data.id
      )
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
