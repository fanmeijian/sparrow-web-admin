import { Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.css']
})
export class UserPasswordResetComponent implements OnInit {
  @Input() user: any

  formGroup: FormGroup = this.fb.group({
    password: [null, Validators.required],
    confirmPassword: [null, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    // @Inject(MAT_DIALOG_DATA) public data:any,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
  }

  submit(){
    this.userService.resetPassword(this.formGroup.value.confirmPassword,this.user.username).subscribe()

  }

  @ViewChild('resetPassword') resetPassword!:TemplateRef<any>
  openDialog(){
    this.dialog.open(this.resetPassword)
  }

}
