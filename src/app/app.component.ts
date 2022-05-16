/** Code is closely based on: https://stackblitz.com/run?file=src%2Fapp%2Fapp.component.ts */

import { Component } from '@angular/core';

export type EditorType = 'hero' | 'profile' | 'name' | 'dynamic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-forms';
  editor: EditorType = 'hero';

  get showNameEditor() {
    return this.editor === 'name';
  }

  get showProfileEditor() {
    return this.editor === 'profile';
  }

  get showHeroForm() {
    return this.editor === 'hero';
  }

  get dynamicForm() {
    return this.editor === 'dynamic';
  }

  toggleEditor(editorChosen: EditorType) {
    this.editor = editorChosen;
  }
}
