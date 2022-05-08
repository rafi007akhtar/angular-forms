import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
// NOTE: no need of a separate directive for reactive forms; writing a validator method will suffice.
// import { forbiddenNameValidator } from '../forbidden-name-validator.directive';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  public heroForm: FormGroup;
  public powers: Array<string>;
  public hero: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
    this.hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };

    this.heroForm = this.fb.group({
      name: [
        this.hero.name, [
          Validators.required,
          Validators.minLength(4),
          // NOTE: call the validator if it is applied to a form control
          this.forbiddenNameValidator(/voldemort/i)
        ]
      ],
      alterEgo: [this.hero.alterEgo],
      power: [this.hero.power, Validators.required]
    }, {
      // NOTE: Just mention the validator (don't call) if it is applied to a form group
      validators: [this.identityRevealedValidator]
    });
  }

  get name() { return this.heroForm.get('name') };

  get power() { return this.heroForm.get('power') };

  submission() {
    console.log('Errors in this form:', this.name.errors);
  }

  // VALIDATORS BEGIN FROM HERE
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    // return a method that takes in a form control and returns a ValidationErrors object
    return (control: AbstractControl): ValidationErrors => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null
    }
  }

  identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');
    return (name && alterEgo && name.value === alterEgo.value) ? { identityRevaled: true } : null;
  }
  // VALIDATORS END HERE

}
