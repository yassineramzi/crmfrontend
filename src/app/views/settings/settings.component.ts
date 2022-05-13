import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  public settingsForm: FormGroup = this.formBuilder.group(
    {
      couleurTheme : new FormControl(null),
      
    }
  );

  constructor(
    protected formBuilder: FormBuilder
  ) {
  }

}
