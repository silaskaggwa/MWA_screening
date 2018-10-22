import { Component, OnInit, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms'
import { ExamService } from './exam.service';

interface Question {
  _id: string,
  question: string,
  duration: number
}

@Component({
  selector: 'app-question',
  template: `
    <div class="exam-input">
      <p>{{question.question}}</p>
      <textarea matInput class="code-input" rows="10" [formControl]="answer"></textarea>
    </div>
  `,
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  answer = new FormControl('');
  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.answer.valueChanges
      .pipe(debounceTime(500))
      .subscribe(snapshot => {
        console.log("qn_id>>", this.question._id);
        this.examService.postSnapshot(this.question._id, snapshot)
          .subscribe(
            response => { console.log(response)},
            error => console.log(error)
          )
      });
  }
}
