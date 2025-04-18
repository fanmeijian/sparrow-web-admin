import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoItemFlatNode } from '../../common/filter-tree/filter-tree.component';
import { ForumCatalog, ForumService } from '@sparrowmini/org-api';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {
  submit() {
    let catalogId: string = this.checklistSelection.selected.map((node) => node.id)[0]
    this.forumService.saveForum(this.fg.value, catalogId).subscribe((res: any) => {
      console.log(res)
    })
  }

  checklistSelection: SelectionModel<TodoItemFlatNode> = new SelectionModel<TodoItemFlatNode>(false /* multiple */);
  treeData: any;
  checkedIds: string[];

  fg: FormGroup = this.formBuilder.group({
    name: [''],
    description: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private forumService: ForumService,
  ) { }

  ngOnInit(): void {
    this.forumService.getForumCatalogTree().subscribe((res: any) => {
      this.treeData = res
    })
  }
}
