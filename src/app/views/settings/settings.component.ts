import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemeSettings } from '../../models/themeSettings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  public settingsForm: FormGroup = this.formBuilder.group(
    {
      couleurTheme : new FormControl(null),
      couleurMenuSelectione : new FormControl(null),
      couleurPolice : new FormControl(null)
    }
  );

  private themeWrapper = document.querySelector('body');

  constructor(
    protected formBuilder: FormBuilder
  ) {
  }

  public saveConfigurationPersonalisee(): void {
    const themeSettings: ThemeSettings = new ThemeSettings(this.settingsForm);
    if(themeSettings.couleurTheme) {
      this.themeWrapper!.style.setProperty('--themeColor', themeSettings.couleurTheme);
    }
    if(themeSettings.couleurMenuSelectione) {
      this.themeWrapper!.style.setProperty('--selectedElementColor', themeSettings.couleurMenuSelectione);
    }
    if(themeSettings.couleurPolice) {
      this.themeWrapper!.style.setProperty('--policeColor', themeSettings.couleurPolice);
    }
  }

  public onCouleurThemeChange(): void {
    const themeSettings: ThemeSettings = new ThemeSettings(this.settingsForm);
    if(themeSettings.couleurTheme) {
      this.themeWrapper!.style.setProperty('--themeColor', themeSettings.couleurTheme);
    }
  }

  public onCouleurMenuSelectioneChange(): void {
    const themeSettings: ThemeSettings = new ThemeSettings(this.settingsForm);
    if(themeSettings.couleurMenuSelectione) {
      this.themeWrapper!.style.setProperty('--selectedElementColor', themeSettings.couleurMenuSelectione);
    }
  }

  public onCouleurPoliceChange(): void {
    const themeSettings: ThemeSettings = new ThemeSettings(this.settingsForm);
    if(themeSettings.couleurPolice) {
      this.themeWrapper!.style.setProperty('--policeColor', themeSettings.couleurPolice);
    }
  }

}
