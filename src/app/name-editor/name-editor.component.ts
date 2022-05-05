import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.scss']
})
export class NameEditorComponent implements OnInit {
  public name: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.name = new FormControl('');
  }

  updateValueToRafi() {
    this.name.setValue('Rafi');
  }

}
