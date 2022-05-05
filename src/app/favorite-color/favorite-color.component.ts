import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-favorite-color',
  templateUrl: './favorite-color.component.html',
  styleUrls: ['./favorite-color.component.scss']
})
export class FavoriteColorComponent implements OnInit, OnChanges {
  public favoriteColorControl: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.favoriteColorControl = new FormControl('');
    // this.favoriteColorControl.setValue('Red');
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('form value:', this.favoriteColorControl.value);
  }

}
