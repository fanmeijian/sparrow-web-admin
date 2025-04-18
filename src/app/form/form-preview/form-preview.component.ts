import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public formJson:any
  ) { }

  ngOnInit(): void {
  }

}
