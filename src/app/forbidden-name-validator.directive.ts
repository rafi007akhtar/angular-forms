import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  // return a method that takes in a form control and returns a ValidationErrors object
  return (control: AbstractControl): ValidationErrors => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null
  }
}

@Directive({
  selector: '[appForbiddenNameValidator]'
})
export class ForbiddenNameValidatorDirective implements Validator {
  @Input('appForbiddenNameValidator') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control) : null;
  }

}
