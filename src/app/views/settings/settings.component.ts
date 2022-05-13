import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  constructor(
    protected formBuilder: FormBuilder
  ) {
  }
  
}
