import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-dict-catalog-create',
  templateUrl: './dict-catalog-create.component.html',
  styleUrls: ['./dict-catalog-create.component.css'],
})
export class DictCatalogCreateComponent implements OnInit {
  formGroup: FormGroup = this.fb.group({
    code: [null, Validators.required],
    name: [null, Validators.required],
  });

  constructor(private dictService: DictService, private fb: FormBuilder,
    private dialogRef:MatDialogRef<DictCatalogCreateComponent>
  ) {}

  ngOnInit(): void {}

  submit() {
    this.dictService.newCatalog([this.formGroup.value]).subscribe(()=>this.dialogRef.close(true));
  }
}
