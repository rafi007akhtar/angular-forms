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
