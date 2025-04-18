import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService, JoblevelService, RoleService } from '@sparrowmini/org-api';
import { switchMap } from 'rxjs';
import { OrgCreateComponent } from '../../org/org-create/org-create.component';
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  parentId: any[] = [];
  submit() {
    // console.log(this.formGroup.value)
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if(this.parentId.findIndex(f=>f.id==='root')>=0){
        this.formGroup.patchValue({isRoot: true})
      }
      console.log(this.parentId)
      let employee = Object.assign({},this.formGroup.value)

      if (this.formGroup.value.id) {
        this.employeeService
          .updateEmployee(employee, employee.id)
          .pipe(
            switchMap((m) =>
              this.employeeService.addEmployeeParent(this.parentId.map(a=>a.id), m.id!)
            )
          )
          .subscribe(() => {
            this.dialogRef.close();
            this.snack.open("保存成功！", "关闭");
          });
      } else {
        this.employeeService
          .newEmployee(employee)
          // .pipe(
          //   switchMap((m) =>
          //     this.employeeService.addEmployeeParent(this.parentId.map(a=>a.id), m.id!)
          //   )
          // )
          .subscribe(() => {
            this.dialogRef.close();
            this.snack.open("保存成功！", "关闭");
          });
      }
    }
  }
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    organizationId: [null, Validators.required],
    isRoot: [false],
    id: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeCreateComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }

  onSelected($event: any) {
    this.formGroup.patchValue({ organizationId: $event });
  }

}
