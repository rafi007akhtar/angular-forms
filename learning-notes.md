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

## Setting up the Form Model
Both reactive and template-driven forms are build on the following classes.

1. `FormControl`
2. `FormGroup`
3. `FormArray`
4. `ControlValueAccessor`

