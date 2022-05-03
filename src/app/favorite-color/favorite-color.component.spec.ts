import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteColorComponent } from './favorite-color.component';

describe('FavoriteColorComponent', () => {
  let component: FavoriteColorComponent;
  let fixture: ComponentFixture<FavoriteColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteColorComponent ]
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
});
