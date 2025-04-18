import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-orggroup-member-add',
  templateUrl: './orggroup-member-add.component.html',
  styleUrls: ['./orggroup-member-add.component.css']
})
export class OrggroupMemberAddComponent implements OnInit {
  employees: any[] = []
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService,
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.employees,this.data)
    this.groupService.addGroupMember(this.employees.map(m=>m.id),'EMPLOYEE',this.data.id).subscribe()
  }
}
