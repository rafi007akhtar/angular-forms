import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteColorComponent } from './favorite-color.component';

describe('FavoriteColorComponent', () => {
	let component: FavoriteColorComponent;
	let fixture: ComponentFixture<FavoriteColorComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FavoriteColorComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FavoriteColorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update the value of the input field', () => {
		/*Query the view for the form input element, and create a custom "input" event for the test.
		Set the new value for the input to Red, and dispatch the "input" event on the form input element.
		Assert that the component's favoriteColorControl value matches the value from the input.
		*/

		const input = fixture.nativeElement.querySelector('input');
		// const event = createNewEvent('input')
		const event = new Event('input');

		input.value = 'Red';
		input.dispatchEvent(event)

		expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
	});

	it('should update the value in control', () => {
		/*Use the favoriteColorControl, a FormControl instance, to set the new value.
		Query the view for the form input element.
		Assert that the new value set on the control matches the value in the input.
		*/

		const val = 'Blue';
		component.favoriteColorControl.setValue(val);
		
		const input = fixture.nativeElement.querySelector('input');
		expect(input.val).toEqual(val);
	});
});
