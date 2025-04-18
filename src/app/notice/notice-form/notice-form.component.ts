import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoticeService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css']
})
export class NoticeFormComponent implements OnInit {

  fg: FormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.max(200)]],
    content: [null, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private noticeService: NoticeService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.fg.value)
    this.noticeService.addNotice(this.fg.value).subscribe()
  }

}
