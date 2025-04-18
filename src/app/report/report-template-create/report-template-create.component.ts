import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService, SysroleService } from '@sparrowmini/org-api';
import { SysroleCreateComponent } from '../../sysrole/sysrole-create/sysrole-create.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-report-template-create',
  templateUrl: './report-template-create.component.html',
  styleUrls: ['./report-template-create.component.css']
})
export class ReportTemplateCreateComponent implements OnInit {
  formGroup: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    templateStr: [null, Validators.required],
    hsql: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private sysroleService: ReportService,
    private dialogRef: MatDialogRef<SysroleCreateComponent>,
    private snack: MatSnackBar,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.formGroup.patchValue(this.data);
    }
  }

  submit() {
    // this.http.post('http://localhost:4421/org-service/reports',[this.formGroup.value]).subscribe()
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (this.data) {
        this.sysroleService
          .updateReportTemplate(this.formGroup.value, this.data.id)
          .subscribe((res: any) => {
            this.dialogRef.close(true);
            // console.log(res)
            if (res?.errMsgs?.length > 0) {
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
        this.sysroleService.newReportTemplate([this.formGroup.value]).subscribe(() => {
          this.dialogRef.close(true);
          this.snack.open('保存成功！', '关闭');
        });
      }
    }
  }

}
