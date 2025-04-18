import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-employee-level-add',
  templateUrl: './employee-level-add.component.html',
  styleUrls: ['./employee-level-add.component.css']
})
export class EmployeeLevelAddComponent implements OnInit {

  roles: any[] = []

  constructor(
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.roles,this.data)
    this.employeeService.addEmployeeLevel(this.roles.map(m=>Object.assign({},{organizationId: m.organizationId, positionLevelId: m.id})),this.data.id).subscribe()
  }
}
