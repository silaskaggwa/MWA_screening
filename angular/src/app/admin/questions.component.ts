import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';
export interface PeriodicElement {
  question: string;
  active: boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styles: [`
    table {width: 100%;} label{color:green} .l-container {margin: 20px 10%;}
    .the-question {width: 80%;}
    .the-qn-status {width: 10%;}
  `]
})
export class QuestionsComponent implements OnInit {
  arr: any[] = [];
  msg: string;
  dataSource: any[] = [];
  displayedColumns: string[] = ['question', 'active'];
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getAllQuestions();
  }
  addQuestion(form: NgForm) {
    this.arr = form.value
    console.log('value', JSON.stringify(form.value));
    this.questionService.addQuestion(this.arr).subscribe(
      resp => console.log('resp>>', resp)
    )
    this.msg = '  Question is saved!';
  }

  getAllQuestions(){
    this.questionService.getQuestions()
      .subscribe((data: any) => {
        this.dataSource = data;
      })
  }
  
  //dataSource = ELEMENT_DATA;
}
