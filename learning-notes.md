# Intro to Forms in Angular

Forms in Angular can be of _two_ types:
- Template-drive
- Reactive

Differences:
### Template-Driven Forms
- Easy and simple to create
- Setup creation is implicit, and is created by directives
- Do not scale very well, and testing requires more setup
- Data flow is aysnchronous
- No direct access to `FormControl` instances
- Validation is done through directives.

### Reactive Forms
- Takes more effort to create
- Setup creation is explicit, and is done in a component class
- Scales well, and tesitng requires minial setup
- Data flow in synchronous
- Direct access to `FormControl` instances
- Validation is done through functions.

While the official guide contains some info on template-driven form, all of that will be skipped from now.
And only Reactive forms notes (and correspondingly, codes) will follow.

## Setting up the Form Model
Both reactive and template-driven forms are build on the following classes.

1. `FormControl`
2. `FormGroup`
3. `FormArray`
4. `ControlValueAccessor`

## Data Flow in Reactive Forms
Both the following images are taken from Angular's website.
1. View to value

    ![Data Flow in Reactive Forms: View to Value](https://angular.io/generated/images/guide/forms-overview/dataflow-reactive-forms-vtm.png)
2. Value to view

    ![Data Flow in Reactive Forms: Value to View](https://angular.io/generated/images/guide/forms-overview/dataflow-reactive-forms-mtv.png)

### Mutability of the Data Model
With reactive Forms, the `FormControl` instance always returns a new object value when the control's value is updated (more efficient).
This is in comparison with template forms, which updates the form property to its new value (less efficient).

## Testing
Testing reactive forms happens through _two_ ways.

**Testing View to Model**
1. Query the input element:
    ```ts
    const input = fixture.nativeElement.query('input')
    ```
2. Change its value, and dispatch that change as a new event.
    ```ts
    const event = new Event('input');
    input.value = 'Red';
    input.dispatchEvent(event);
    ```
3. Expect the form control's value to match the view value.
    ```ts
    // here, `favoriteColorControl` is the name of the form control element
    expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
    ```

**Testing Model to View**
1. Change the form component's value.
    ```ts
    component.favoriteColorControl.setValue('Blue');
    ```
2. Query the input element, and expect its value to equal the form component's value.
    ```ts
    const input = fixture.nativeElement.query('input');
    expect(input.val).toEqual('Blue');
    ```

Testing template forms has been skipped, but it can be found in the official docs, [here](https://angular.io/guide/forms-overview#testing-template-driven-forms).

# Reactive Forms
To add a reactive form to your project, the steps are:
1. Inside app module, import the following class, and add it to the list of `imports`.
    ```ts
    import { ReactiveFormsModule } from '@angular/forms';

    @NgModule({
        imports: [
            ReactiveFormsModule,
            // ... other imports
        ], // ... and so on
    })
    ```
2. Inside your component, import `FormControl`. and use it to instantiate its object.
    ```ts
    import { FormControl } from '@angular/forms';

    ngOnInit(): void {
        this.favoriteColorControl = new FormControl('');
        // ... and so on
    }
    ```
3. Bind this instance to the corresponding form element in the view.
    ```html
    <input type="text" [formControl]="favoriteColorControl">
    ```

## Form Group
A form group is, to put it loosely, a gathering of form controls.

To create a form group, the steps are:
1. In your TS file of the component, import `FormGroup` (in addition to importing `FormControl`).
    ```ts
    import { FormControl } from '@angular/forms';
    import { FormGroup } from '@angular/forms';

    ```
2. Create a new variable with the form group type, and initialize it with the needed form controls.
    ```ts
    public profileForm: FormGroup;
    ngOnInit(): void {
        this.profileForm = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl('')
        });
    }
    ```

3. In the view, create a form element, and bind it wwith the form group created in TS. Inside the form element, create the input elements and bind each one of them with the its corresponding form control in the TS. (Binding happens through only an _attribute_ instead of an actual one-way bind.)
    ```html
    <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
        <label for="firstName">First name: </label>
        <input type="text" formControlName="firstName">

        <label for="lastName">Last name: </label>
        <input type="text" formControlName="lastName">

        <p>Complete the form to enable submit.</p>
        <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
    ```

4. As shown above, form submission can be done using the `ngSubmit` event binding, whose value will be the submit method defined in the TS. This method will be called when the button with `submit` type will be clicked in the form.
    ```ts
    onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.profileForm.value);
    }
    ```

### Nesting Form Groups
To implement nesting,
- Add a `FormGroup` inside the current `FormGroup` (TS).
- Bind this form group with a div within the form element using `formGroupName` attribute (HTML).
- Inside this form group, add the nested `FormControls` as required (TS).
- Bind these controls with their corresponding input elements as usual, with `formControlName` attribute (HTML).

For example, TS:
```ts
this.profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
        street: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl('')
    })
});
```
And view:
```html
<div formGroupName="address">
    <h2>Address</h2>
    <label for="street">Street: </label>
    <input type="text" id="street" formControlName="street"> <br>
    <label for="city">City: </label>
    <input type="text" id="city" formControlName="city"> <br>
    <label for="state">State: </label>
    <input type="text" id="state" formControlName="state"> <br>
    <label for="zip">Zip: </label>
    <input type="number" id="zip" formControlName="zip"> <br>
</div>
```

### Update an element in the form
To update one or more elements in the form, the method `patchValue` can be used.
For example, to just update the name and address in the above form, you can write this:
```ts
this.profileForm.patchValue({
    firstName: 'Sherlock',
    address: {
        street: '221 B, Baker Street'
    }
});
```

## Form Builder
Form builders are created by importing them into the component, injecting it in the constructor, and creating form group equivalents using its `group` method.
For example:
- Import
    ```ts
    import { FormBuilder, Validators } from '@angular/forms';
    ```
- Constructor
    ```ts
    constructor(private fb: FormBuilder) { }
    ```
- OnInit:
    ```ts
      ngOnInit(): void {
        this.profileForm = this.fb.group({
            firstName: [''],
            lastName: [''],
            address: this.fb.group({
                street: [''],
                city: [''],
                state: [''],
                zip: ['']
            })
        });
    }
    ```
The first value of each control array is the initial value of the form control. The arrays can have sync and async validators as the second and third values. For example, the first name be made mandtory by modifying it to `firstName: ['', Validators.required]`.

## Form Array
It is used to add form elements when their total number is not known beforehand.

For example, to add a field to contain all "hobbies", `FormArray` can be used. Firstly, import it.
```ts
import { FormArray } from '@angular/forms';
```

Next, add a form array in your form builder.
```ts
this.profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
    }),
    hobbies: this.fb.array([ this.fb.control('') ]) // NOTE: this line
});
```

Next, add a getter to get this array, and a method to add to this array a new element.
```ts
get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
}

addNewHobby() {
    this.hobbies.push(this.fb.control(''));
}
```

Finally, in the view, add a div to show all hobby arrays (as form inputs) and a button for adding a new hobby.
```html
<div formArrayName="hobbies">
    My hobbies are:
    <div *ngIf="hobbies.controls.length > 0">
        <div *ngFor="let hobby of hobbies.controls; let i=index">
            <input type="text"  [formControlName]="i"> <br>
        </div>
    </div>
    <button type="button" (click)="addNewHobby()">Add New Hobby</button>
</div>
```

# Validating form input
This section will contain notes of validation of _reactive forms_ only. Template-driven are skipped.

## Adding Sync Validators to `FormBuilder`
Inside a form builder, the sync validators can be added as an array in the _second element_ of a form control array. For example:
```ts
this.powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];
this.hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };
this.heroForm = this.fb.group({
    name: [
        this.hero.name, [
            // validators will go in this array
            Validators.required,
            Validators.minLength(4)
        ]
    ],
    alterEgo: [this.hero.alterEgo],
    power: [this.hero.power, Validators.required]
});
```
The validators `required` and `minlength` added to the `name` control of the form can then be used in the view as:
```html
<form [formGroup]="heroForm"">
    <label for="name">Name: </label>
    <input type="text" required id="name" class="form-control" formControlName="name">

    <div *ngIf="name.invalid">
        <div *ngIf="name.errors?.required">Name is required</div>
        <div *ngIf="name.errors?.minlength"> <!-- NOTE: in view => minlength, in TS => minLength -->
            Name should be min 4 characters long
        </div>
    </div>

    <br><br>
    <div>Validation status: <span class="heroForm-status" [innerHTML]="heroForm.status"></span></div>
    <br>
    <button type="submit" [disabled]="heroForm.invalid">Submit</button>
</form>
```
**Note.** The `Validators.required` validator in the `name` field of the TS is plenty to make the name field mandatory; the `required` attribute in the `<input>` element is not needed. However, it should still be added because is will be used for accessibility purposes.

## Custom Validators
The above validators were built in to Angular. Custom validators can be created as _methods_ that return a validator method.

A validator method implements the `ValidatorFn` interafce. Basically, it:
- takes a form control as parameter
- performs validation based on the value of that control
- returns an object containing errors, if any, or `null` otherwise.

The data type of the form control is `AbstractControl` and the return type of the validator method is `ValidationErrors`.

For example, the following method, `forbiddenNameValidator`, can be a custom validator for the above `name` field.
```ts
forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    // return a method that takes in a form control and returns a ValidationErrors object
    return (control: AbstractControl): ValidationErrors => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: {value: control.value}} : null
    }
}
```
The above form builder can be modified slightly to incorporate this custom validator in the `name` field.
```ts
this.heroForm = this.fb.group({
    name: [
        this.hero.name, [
            Validators.required,
            Validators.minLength(4),
            this.forbiddenNameValidator(/voldemort/i)  // NOTE: this line
        ]
    ],
    alterEgo: [this.hero.alterEgo],
    power: [this.hero.power, Validators.required]
});
```
And finally, error messages can be shown in the view based on this validator.
```html
<div *ngIf="name.invalid && (name.dirty || name.touched)">
    <div *ngIf="name.errors?.required">Name is required</div>
    <div *ngIf="name.errors?.minlength">
        Name should be min 4 characters long
    </div>
    <!-- NOTE: this following block -->
    <div *ngIf="name.errors?.forbiddenName"><em>Voldemort</em> is a forbidden name.</div>
</div>
```

## Control Status CSS Classes
The status of the form can be obtained through the following CSS classes.
```css
.ng-valid /* when there are no errors in the form */
.ng-invalid /* when there is at least 1 error in the form */
.ng-pristine /* when the user is yet to make any changes to the watched field */
.ng-dirty /* when the user changes the value in the watched field */
.ng-touched /* when the user blurs the form control element */
.ng-untouched /* when the user is yet to focus on the form field */
.ng-pending
.ng-submitted  /* only on form element enclosures */
```
Therefore, the above div block containing the error messages for the `name` field can be modified to only show up when the name has been changed or blurred.
```html
<form [formGroup]="heroForm" (ngSubmit)="submission()">
    <label for="name">Name: </label>
    <input type="text" required id="name" class="form-control" formControlName="name">

    <!-- NOTE: The following line -->
    <div *ngIf="name.invalid && (name.dirty || name.touched)">
        <div *ngIf="name.errors?.required">Name is required</div>
        <div *ngIf="name.errors?.minlength">
            Name should be min 4 characters long
        </div>
        <div *ngIf="name.errors?.forbiddenName"><em>Voldemort</em> is a forbidden name.</div>
    </div>

    <br><br>
    <div>Validation status: <span class="heroForm-status" [innerHTML]="heroForm.status"></span></div>
    <br>
    <button type="submit" [disabled]="heroForm.invalid">Submit</button>
</form>
```
And the CSS can be modified to show the error status as green or red based on it is valid or invalid respectively. (I'm using SCSS here.)
```scss
$valid-status: #42A948; /* green */
$invalid-status: #a94442; /* red */

.ng-invalid .heroForm-status {
    color: $invalid-status;
}

.ng-valid .heroForm-status {
    color: $valid-status;
}
```

## Cross Field Validation
The above custom validator checked the name field _independent_ of the other fields.

Cross field validation comes into play when the value of a field being valid or not depends on the value of some other field. This type of validator is applied in the _form group_ as a whole, and not in an individual form control.

For example, to make sure the `name` of a hero does not match its `alterEgo`, here is a validator method that can make that check.
```ts
identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    const name = control.get('name');
    const alterEgo = control.get('alterEgo');
    return (name && alterEgo && name.value === alterEgo.value) ? { identityRevaled: true } : null;
}
```
This validator is added to the form group of the above form builder as its _second_ key-vakue pair. (The first being the form group, of course.)
```ts
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
    validators: [this.identityRevealedValidator]  // this line
});
```
The validator is added in the array which happens to be the value of the `validators` key. If there are multiple validators, they could be pushed to this validators array when needed.

Now, the form can be modified to house this new validation.
```html
<form [formGroup]="heroForm" (ngSubmit)="submission()">
    <label for="name">Name: </label>
    <input type="text" required id="name" class="form-control" formControlName="name">

    <div *ngIf="name.invalid && (name.dirty || name.touched)">
        <div *ngIf="name.errors?.required">Name is required</div>
        <div *ngIf="name.errors?.minlength">
            Name should be min 4 characters long
        </div>
        <div *ngIf="name.errors?.forbiddenName"><em>Voldemort</em> is a forbidden name.</div>
    </div>

    <!-- NOTE: this following block -->
    <div *ngIf="heroForm.errors?.identityRevaled">
        Name and Alter Ego cannot be the same.
    </div>

    <br><br>
    <div>Validation status: <span class="heroForm-status" [innerHTML]="heroForm.status"></span></div>
    <br>
    <button type="submit" [disabled]="heroForm.invalid">Submit</button>
</form>
```
Note that the errors being queued here is on `heroForm`, instead of `name`. That's because the validator was applied to the form group (`heroForm`) instead of the form control (`name`).
