import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JwtResponse } from '../../models/jwtResponse.model';
import { ThemeSettings } from '../../models/themeSettings.model';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import SettingsService from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  
  @ViewChild('labelImportFavicon')
  public labelImportFavicon: ElementRef;

  @ViewChild('labelImportLogo')
  public labelImportLogo: ElementRef;

  public settingsForm: FormGroup = this.formBuilder.group(
    {
      couleurTheme : new FormControl(null),
      couleurMenuSelectione : new FormControl(null),
      couleurPolice : new FormControl(null),
      logo: new FormControl(null),
      favicon : new FormControl(null)
    }
  );

  private favIconImageBase64: string;

  private logoImageBase64: string;

  private themeWrapper = document.querySelector('body');

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  public saveConfigurationPersonalisee(): void {
    const jwtResponse: JwtResponse = this.tokenStorageService.getUser();
    const themeSettings: ThemeSettings = new ThemeSettings(this.settingsForm, this.favIconImageBase64, this.logoImageBase64, jwtResponse.societe );
    if(themeSettings.couleurTheme) {
      this.themeWrapper!.style.setProperty('--themeColor', themeSettings.couleurTheme);
    }
    if(themeSettings.couleurMenuSelectione) {
      this.themeWrapper!.style.setProperty('--selectedElementColor', themeSettings.couleurMenuSelectione);
    }
    if(themeSettings.couleurPolice) {
      this.themeWrapper!.style.setProperty('--policeColor', themeSettings.couleurPolice);
    }
    this.settingsService.create(themeSettings).subscribe(
      response => {
        console.log(response.body);
      }
    );
  }

  public onThemeChange(): void {
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

  public favIconUpload(event:any): void {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.favIconImageBase64 = event.target.result;
       };
       reader.readAsDataURL(event.target.files[i]);
       this.labelImportFavicon.nativeElement.innerText = event.target.files[i].name;
    }
  }

  public logoUpload(event:any): void {
    var file = event.target.files.length;
    for(let i=0;i<file;i++)
    {
       var reader = new FileReader();
       reader.onload = (event:any) => 
       {
           this.logoImageBase64 = event.target.result;
       };
       reader.readAsDataURL(event.target.files[i]);
       this.labelImportLogo.nativeElement.innerText = event.target.files[i].name;
    }
  }

}
