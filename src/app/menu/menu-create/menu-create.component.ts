import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css'],
})
export class MenuCreateComponent implements OnInit {
  parentId: any[] = []
  submit() {
    // console.log(this.formGroup.value)
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if(this.formGroup.value.id){
        this.menuService.updateMenu(this.formGroup.value,this.formGroup.value.id).subscribe(()=>{
          this.dialogRef.close()
          this.snack.open('保存成功！','关闭')
        });
      }else{
        this.menuService.newMenu(this.formGroup.value).subscribe(()=>{
          this.dialogRef.close()
          this.snack.open('保存成功！','关闭')
        });
      }

    }
  }
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    icon: [null, Validators.required],
    url: [null, Validators.required],
    parentId: [null],
    id: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private dialogRef: MatDialogRef<MenuCreateComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {
    if(this.data){
      this.formGroup.patchValue(this.data)
    }

  }

  onSelected($event:any){
    console.log($event)
    this.formGroup.patchValue({parentId: $event})
  }
}
