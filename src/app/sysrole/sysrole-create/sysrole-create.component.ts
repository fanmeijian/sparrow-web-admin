import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SysroleService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-sysrole-create',
  templateUrl: './sysrole-create.component.html',
  styleUrls: ['./sysrole-create.component.css'],
})
export class SysroleCreateComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sysroleService: SysroleService,
    private dialogRef: MatDialogRef<SysroleCreateComponent>,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.data) {
        this.sysroleService
          .updateSysrole(this.formGroup.value, this.data.id)
          .subscribe((res: any) => {
            this.dialogRef.close(true);
            console.log(res)
            if (res.errMsgs.length > 0) {
              this.snack.open(
                '保存成功,但部分字段无权限更新！' +
                  res.errMsgs.map((m: any) => m.msg),
                '关闭'
              );
            } else {
              this.snack.open('保存成功！', '关闭');
            }
          });
      } else {
        this.sysroleService.newSysrole(this.formGroup.value).subscribe(() => {
          this.dialogRef.close(true);
          this.snack.open('保存成功！', '关闭');
        });
      }
    }
  }
}
