import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataPermission, DataPermissionBean, DataPermissionService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-data-permission-view',
  templateUrl: './data-permission-view.component.html',
  styleUrls: ['./data-permission-view.component.css']
})
export class DataPermissionViewComponent implements OnInit {
  @Input() public data:any

  @ViewChild("permissionDialog") permissionTemplate!: TemplateRef<any>

  dataPermission?: DataPermissionBean
  constructor(

    private dataPermissionService: DataPermissionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.dataPermissionService.dataPermission(this.data).subscribe((res)=>{
        this.dataPermission = res

      })
    }

  }
  view(){
    this.dialog.open(this.permissionTemplate)
  }
  removeUser(a:any,b:any){

  }
  remove(a:any,b:any){

  }

  removeRule(a:any,b:any){

  }


}


