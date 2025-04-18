import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-employee-role-add',
  templateUrl: './employee-role-add.component.html',
  styleUrls: ['./employee-role-add.component.css']
})
export class EmployeeRoleAddComponent implements OnInit {

  roles: any[] = []

  constructor(
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.roles,this.data)
    this.employeeService.addEmployeeRole(this.roles.map(m=>Object.assign({},{organizationId: m.organizationId, roleId: m.id})),this.data.id).subscribe()
  }

}
