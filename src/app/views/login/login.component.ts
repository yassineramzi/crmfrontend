import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtResponse } from '../../models/jwtResponse.model';
import { LoginRequest } from '../../models/loginRequest.model';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup = this.formBuilder.group({
    username : new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password : new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  public isLoggedIn: boolean = false;
  public isLoginFailed: boolean = false;
  public errorMessage: string = '';
  public returnUrl: string 

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    if (this.isLoggedIn === true) {
      this.router.navigate([this.returnUrl]);
    }
  }

  public login(): void {
    let loginRequest: LoginRequest = this.createLoginRequestFromForm();
    this.authService.login(loginRequest).subscribe(
      (response : HttpResponse<JwtResponse>) => {
        this.tokenStorageService.saveToken(response.body.token);
        this.tokenStorageService.saveUser(response.body);
        this.isLoginFailed = true;
        this.isLoggedIn = true;
        this.router.navigate([this.returnUrl]);
      },
      (err) => {
        this.isLoginFailed = true;
      }
    );
  }

  private createLoginRequestFromForm(): LoginRequest {
    return new LoginRequest(
      this.loginForm.get(['username'])!.value,
      this.loginForm.get(['password'])!.value
    );
  }
}
