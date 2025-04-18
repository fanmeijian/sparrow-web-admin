import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DictService } from '@sparrowmini/org-api';
import { DictCatalog } from '@sparrowmini/org-api/model/dictCatalog';
import { DynamicFlatNode } from '../dicts/dict-tree-datasource';
import { Dict } from '@sparrowmini/org-api/model/dict';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dict-create',
  templateUrl: './dict-create.component.html',
  styleUrls: ['./dict-create.component.css'],
})
export class DictCreateComponent implements OnInit {
  selectedItems: DynamicFlatNode[] = [];
  formGroup: FormGroup = this.fb.group({
    code: [null, Validators.required],
    name: [null, Validators.required],
    catalogId: [null, Validators.required],
    parentId: [null],
  });

  constructor(private dictService: DictService, private fb: FormBuilder,
    private dialogRef: MatDialogRef<DictCreateComponent>,
  ) {}

  ngOnInit(): void {}

  submit() {
    // console.log(this.selectedItems, this.formGroup.value);
    if (this.selectedItems[0].type === 'CATALOG') {
      this.formGroup.patchValue({ catalogId: this.selectedItems[0].id });

    } else {
      let dict: Dict = this.selectedItems[0].me;
      this.formGroup.patchValue({
        catalogId: dict.catalogId,
        parentId: dict.id,
      });
    }
    // console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      this.dictService.newDict([this.formGroup.value]).subscribe(()=>{
        this.dialogRef.close(true)
      });
    }
  }
}
