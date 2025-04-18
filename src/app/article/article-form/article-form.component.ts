import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BASE_PATH } from '@sparrowmini/org-api';
import { Form } from 'formiojs';
import { TodoItemFlatNode } from '../../common/filter-tree/filter-tree.component';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { J, O } from '@angular/cdk/keycodes';
import { TreeViewOption } from '../../common/tree-view/tree-view.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  window = window

  treeViewOption: TreeViewOption ={
    checklistSelection: new SelectionModel<TodoItemFlatNode>(true /* multiple */),
    treeData: undefined,
    parentSelectable: false,
    checkedIds: []
  }

  attachments: any[] = []
  // checklistSelection: SelectionModel<TodoItemFlatNode> = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  // treeData: any;
  // checkedIds: string[];

  onSubmit() {
    this.fg.patchValue({ attachments: this.attachments, catalogs: this.treeViewOption.checklistSelection.selected.map(m => m.id) })
    console.log(this.fg.value, this.fg.valid)
    Object.keys(this.fg.controls).forEach((key) => { console.log(key, this.fg.controls[key].errors) })

    if (this.fg.valid) {
      if (this.fg.value.id) {
        this.http.patch(this.apiBase + '/cms/article/' + this.fg.value.id, this.fg.value).subscribe((res: any) => {
          this.fg.disable()
        })
      } else {
        this.http.post(this.apiBase + '/cms/article', this.fg.value).subscribe((res: any) => {
          this.fg.patchValue({ id: res.data.id })
          this.fg.disable()
        })
      }

    }
  }

  fg: FormGroup = this.formBuilder.group({
    id: [null],
    title: [null, Validators.required],
    content: [null, Validators.required],
    catalogs: [[], Validators.required],
    requiredCoins: [0, Validators.required],
    attachments: [null],
  })
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    @Inject(BASE_PATH) private apiBase: string,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.fg.disable()
    this.route.queryParams.subscribe((params: any) => {
      if (params.id || this.fg.value.id) {
        this.http.get(this.apiBase + '/cms/article/' + params.id).subscribe((res: any) => {
          this.fg.patchValue(res)
          this.attachments = res.attachments
          this.fg.disable()
          this.treeViewOption = Object.assign({},this.treeViewOption,{checkedIds: res.catalogs,treeData:JSON.parse(localStorage.getItem('article-catalog-tree')!)})
        })
      } else {
        this.fg.enable()
      }
    })
    
  }

}
