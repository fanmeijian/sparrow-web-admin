import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PemgroupService, ScopeService } from '@sparrowmini/org-api';
import { SysroleCreateComponent } from '../../sysrole/sysrole-create/sysrole-create.component';

@Component({
  selector: 'app-pemgroup-create',
  templateUrl: './pemgroup-create.component.html',
  styleUrls: ['./pemgroup-create.component.css']
})
export class PemgroupCreateComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sysroleService: PemgroupService,
    private dialogRef: MatDialogRef<PemgroupCreateComponent>,
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
          .updateGroup(this.formGroup.value, this.data.id)
          .subscribe(() => {
            this.dialogRef.close(true);
            this.snack.open("保存成功！", "关闭");
          });
      } else {
        this.sysroleService.newGroup(this.formGroup.value).subscribe(() => {
          this.dialogRef.close(true);
          this.snack.open("保存成功！", "关闭");
        });
      }
    }
  }

}
