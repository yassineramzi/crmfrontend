import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtResponse } from '../../models/jwtResponse.model';
import { LoginRequest } from '../../models/loginRequest.model';
import { ThemeSettings } from '../../models/themeSettings.model';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import SettingsService from '../../services/settings.service';
import ThemeService from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public isLoggedIn: boolean = false;
  public isLoginFailed: boolean = false;
  public errorMessage: string = '';
  public returnUrl: string 
  public step: string= 'TYPE_LOGIN';
  public logoSrc: string= '../../../assets/img/brand/logo.png';
  public logoWidth: number = 116;
  public logoHeight: number = 32;
  public loginForm: FormGroup = this.formBuilder.group({
    username : new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password : new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private settingsService: SettingsService,
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ){
      const themeSettings: ThemeSettings = this.tokenStorageService.getThemeSettings();
      if(themeSettings){
        this.logoSrc = themeSettings.logoImageBase64;
        this.logoWidth = 100;
        this.logoHeight = 100;
        this.themeService.applyTheme();
      }
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    if (this.isLoggedIn === true) {
      this.router.navigate([this.returnUrl]);
    }
  }

  public nextStep(): void {
    this.settingsService
    .getSettingsByLogin(this.loginForm.get(['username'])!.value)
    .subscribe(
      (response: HttpResponse<ThemeSettings>) => {
        const themeSettings: ThemeSettings = response.body;
        if(themeSettings){
          this.logoSrc = themeSettings.logoImageBase64;
          this.tokenStorageService.saveThemeSettings(themeSettings);
          this.themeService.applyTheme();
          this.logoWidth = 100;
          this.logoHeight = 100;
        }
        this.step = 'TYPE_PASSWORD';
        this.loginForm.get(['username']).disable();
      }
    );
  }

  public login(): void {
    let loginRequest: LoginRequest = this.createLoginRequestFromForm();
    this.authService.login(loginRequest).subscribe(
      (response : HttpResponse<JwtResponse>) => {
        this.tokenStorageService.saveToken(response.body.token);
        this.tokenStorageService.saveUser(response.body);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate([this.returnUrl]);
      },
      (err) => {
        this.isLoginFailed = true;
      }
    );
  }

  public isValidLogin(): boolean {
    if(this.loginForm.get(['username']).value != null && !this.loginForm.get('username').hasError('minLength'))
      return true
    return false;
  }

  private createLoginRequestFromForm(): LoginRequest {
    return new LoginRequest(
      this.loginForm.get(['username'])!.value,
      this.loginForm.get(['password'])!.value
    );
  }

}
