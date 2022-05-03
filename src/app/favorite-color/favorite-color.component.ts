import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-favorite-color',
  templateUrl: './favorite-color.component.html',
  styleUrls: ['./favorite-color.component.scss']
})
export class FavoriteColorComponent implements OnInit {
  public favoriteColorControl: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.favoriteColorControl = new FormControl('');
  }

}
