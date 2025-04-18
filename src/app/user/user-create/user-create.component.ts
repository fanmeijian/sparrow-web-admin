import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  formGroup: FormGroup = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<UserCreateComponent>,
  ) {
    if(this.data){
      this.formGroup.patchValue(this.data)
      this.formGroup.get("username")?.disable()
    }
  }

  ngOnInit(): void {
  }

  submit(){
    if(this.data){
      this.userService.updateUser(this.formGroup.value,this.data.username).subscribe(()=>{

      })
    }else{
      this.userService.createUser([this.formGroup.value]).subscribe(()=>{
          this.dialogRef.close(this.formGroup.value)
      })
    }

  }

}
