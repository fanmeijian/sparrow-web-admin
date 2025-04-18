import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItemFlatNode } from '../filter-tree/filter-tree.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TreeViewOption } from '../tree-view/tree-view.component';

@Component({
  selector: 'app-new-tree',
  templateUrl: './new-tree.component.html',
  styleUrls: ['./new-tree.component.css']
})
export class NewTreeComponent implements OnInit {

    treeViewOption?: TreeViewOption 

  checklistSelection: SelectionModel<TodoItemFlatNode> = new SelectionModel<TodoItemFlatNode>(false /* multiple */);
  selectedNodes($event: import("../filter-tree/filter-tree.component").TodoItemFlatNode[]) {
    console.log($event);
  }


  fg: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    code: [null, Validators.required],
    parentId: [null],
  });

  submit() {
    let checklistSelection = this.treeViewOption?.checklistSelection
    if(checklistSelection && checklistSelection.selected[0]){
      this.fg.patchValue({parentId: checklistSelection.selected[0].id});
    }
    if(this.fg.valid){
      this.dialogRef.close(this.fg.value);
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public treeData: any,
    private dialogRef: MatDialogRef<NewTreeComponent>,
  ) { 
    this.treeViewOption = {
      checklistSelection: new SelectionModel<any>(true /* multiple */),
      treeData: this.treeData,
      parentSelectable: false,
    }
  }

  ngOnInit(): void {
  }

}
