import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  public profileForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // NOTE: Uncomment to use Form Group instead
    // this.profileForm = new FormGroup({
    //   firstName: new FormControl(''),
    //   lastName: new FormControl(''),
    //   address: new FormGroup({
    //     street: new FormControl(''),
    //     city: new FormControl(''),
    //     state: new FormControl(''),
    //     zip: new FormControl('')
    //   })
    // });

    // NOTE: Uncomment to use Form Builder instead
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      hobbies: this.fb.array([ this.fb.control('') ])
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  performPartialUpdate() {
    this.profileForm.patchValue({
      firstName: 'Sherlock',
      address: {
        street: '221 B, Baker Street'
      }      
    });
  }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  addNewHobby() {
    this.hobbies.push(this.fb.control(''));
  }

}
