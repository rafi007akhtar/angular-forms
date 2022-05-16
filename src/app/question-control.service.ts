import { Injectable } from '@angular/core';
import { QuestionBase } from './dynamic-form-question-component/question-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor() { }

  toFormGroup(questions: QuestionBase<string>[]) {
    const group = {};
    questions.forEach((question: QuestionBase<string>) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
