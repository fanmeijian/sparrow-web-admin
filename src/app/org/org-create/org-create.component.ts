import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from '@sparrowmini/org-api';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-org-create',
  templateUrl: './org-create.component.html',
  styleUrls: ['./org-create.component.css'],
})
export class OrgCreateComponent implements OnInit {
  parentId: any[] = [];
  submit() {
    // console.log(this.formGroup.value)
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.formGroup.value.type === 'UNIT' && this.parentId.length === 0) {
        this.snack.open('当类型为部门时，必须选择上级组织！', '关闭');
        return;
      }
      if (this.parentId.length > 0) {
        this.formGroup.patchValue({ root: false });
      }
      if (this.formGroup.value.id) {
        this.menuService
          .updateOrg(this.formGroup.value, this.formGroup.value.id)
          .subscribe(() => {
            this.dialogRef.close();
            this.snack.open('保存成功！', '关闭');
          });
      } else {
        this.menuService
          .newOrg(
            this.formGroup.value,
            this.parentId.map((a) => a.id)
          )
          .subscribe(() => {
            this.dialogRef.close();
            this.snack.open('保存成功！', '关闭');
          });
      }
    }
  }
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    type: [null, Validators.required],
    root: [true],
    id: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private menuService: OrganizationService,
    private dialogRef: MatDialogRef<OrgCreateComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      // console.log(this.data);
      this.formGroup.patchValue(this.data.me);
      this.parentId.push(...this.data.parents);
    }
  }

  onSelected($event: any) {
    // console.log($event);
    // this.formGroup.patchValue({ parentId: $event });
  }
}
