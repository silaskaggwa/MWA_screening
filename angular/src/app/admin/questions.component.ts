import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';
export interface PeriodicElement {
  question: string;
  active: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { question: 'what is last name of Tigist?', active: true },
  { question: 'what is last name of Silas?', active: true },
  { question: 'what is last name of Alem?', active: true },

];
@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styles: [`table {width: 70%;} label{color:green}`]
})
export class QuestionsComponent implements OnInit {
  arr: any[] = [];
  msg: string;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }
  addQuestion(form: NgForm) {
    this.arr = form.value
    console.log('value', JSON.stringify(form.value));
    this.questionService.addQuestion(this.arr).subscribe(
      resp => console.log('resp>>', resp)
    )
    this.msg = '  Question is saved!';
  }

  displayedColumns: string[] = ['question', 'active'];
  dataSource = ELEMENT_DATA;
}
