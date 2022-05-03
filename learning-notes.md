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
1. View to value ![Data Flow in Reactive Forms: View to Value](https://angular.io/generated/images/guide/forms-overview/dataflow-reactive-forms-vtm.png)
2. Value to vieww ![Data Flow in Reactive Forms: Value to View](https://angular.io/generated/images/guide/forms-overview/dataflow-reactive-forms-mtv.png)

### Mutability of the Data Model
With reactive Forms, the `FormControl` instance always returns a new object value when the control's value is updated (more efficient).
This is in comparison with template forms, which updates the form property to its new value (less efficient).

