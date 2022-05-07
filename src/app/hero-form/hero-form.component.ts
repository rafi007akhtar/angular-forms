import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        this.hero.name,
        [Validators.required, Validators.minLength(4)]
      ],
      alterEgo: [this.hero.alterEgo],
      power: [this.hero.power, Validators.required]
    });
  }

  get name() { return this.heroForm.get('name') };

  get power() { return this.heroForm.get('power') };

}
