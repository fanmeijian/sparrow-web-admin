import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, Feedback, FeedbackService } from '@sparrowmini/org-api';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  feedback:Feedback = {}

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id")
    if(id){
      this.feedbackService.getFeedback(id).subscribe(res=>{
        this.feedback = res
      })
    }
  }

  onCommentSaved($event: Comment) {
    this.feedbackService.updateFeedback({commentId: $event.bizCommentId},this.feedback.id!).subscribe()
  }
}
