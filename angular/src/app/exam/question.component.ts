import { Component, OnInit, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms'
import { ExamService } from './exam.service';

interface Question {
  _id: string,
  question: string,
  duration: number,
  last_answer: string
}

@Component({
  selector: 'app-question',
  template: `
    <div class="exam-input">
      <p>{{question.question}}</p>
      <textarea matInput class="code-input" rows="10" (blur)="onBlur()" (focus)="onFocus()" [formControl]="answer"></textarea>
    </div>
  `,
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  answer = new FormControl('');
  private duration;
  private theTimer;

  startTimer(){
    this.theTimer = setInterval(()=> {
      this.duration++;
    }, 1000);
  }

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.duration = this.question.duration;
    this.answer.setValue(this.question.last_answer);
    this.answer.valueChanges
      .pipe(debounceTime(500))
      .subscribe(snapshot => {
        this.sendProgressToServer(snapshot);
      });
  }

  sendProgressToServer(snapshot){
    this.examService.postSnapshot(this.question._id, snapshot, this.duration)
      .subscribe(
        response => { console.log(response)},
        error => console.log(error)
      );
  }

  onFocus(){
    this.startTimer();
  }
  onBlur(){
    console.log("timer destroyed");
    clearInterval(this.theTimer);
    this.sendProgressToServer(this.answer);
  }
}
