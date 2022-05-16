import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../dynamic-form-question/question-base';
import { QuestionService } from '../question.service';
import { QuestionControlService } from '../question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  questions: QuestionBase<string>[];
  form!: FormGroup;
  payLoad = ''

  constructor(
    private qs: QuestionService,
    private qcs: QuestionControlService
  ) { }

  ngOnInit(): void {
    this.qs.getQuestions().subscribe(ques => {
      this.questions = ques;
      if (this.questions && this.questions.length > 0) {
        this.populateTheForm();
      }
    })
  }

  populateTheForm() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[])
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log('payLoad:', this.payLoad);
  }

}
