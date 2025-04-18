import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Comment, CommentService, PageComment } from '@sparrowmini/org-api';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit, OnChanges {
  saveComment() {
    this.commentService.addComment({ bizCommentId: this.bizCommentId,comment: this.content, attachments: this.attachments }).subscribe((res) => {
      this.onCommentSaved.emit(res)
      this.attachments = []
      this.content = ''
      this.bizCommentId = res.bizCommentId
      this.onPage(this.pageable)
    })
  }

  @Input() public bizCommentId
  @Output() public onCommentSaved: EventEmitter<Comment> = new EventEmitter<Comment>()


  comments: Comment[]
  attachments: any[] = []
  content: ''

  pageable = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
    sort: ['createdDate,desc'],
  };

  constructor(
    private commentService: CommentService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if (this.bizCommentId) {
      this.onPage(this.pageable)
    }

  }

  ngOnInit(): void {

  }

  onPage(page: PageEvent) {
    this.pageable.pageIndex = page.pageIndex
    this.pageable.pageSize = page.pageSize
    this.commentService.comments(this.bizCommentId, this.pageable.pageIndex, this.pageable.pageSize, this.pageable.sort).subscribe(res => {
      this.comments = res.content
      this.pageable.length = res.totalElements!
    })
  }

}
