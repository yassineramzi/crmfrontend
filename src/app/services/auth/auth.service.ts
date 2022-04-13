import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from "@environments/environment";
import { LoginRequest } from "@models/loginRequest.model";
import { JwtResponse } from "@models/jwtResponse.model";
import { TokenStorageService } from './token-storage.service';

type EntityResponseType = HttpResponse<JwtResponse>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public resourceUrl = environment.api_url + 'api/authentication';

  constructor(
    protected http: HttpClient,
    protected tokenStorageService: TokenStorageService,
    protected router: Router
    ) { }

  login(loginRequest: LoginRequest): Observable<EntityResponseType> {
    return this.http.post<JwtResponse>(this.resourceUrl + '/login', loginRequest, {observe: 'response'});
  }

  logout(): void {
    this.tokenStorageService.clearSession();
    this.router.navigate(['/login-page']);
  }

  isAuthorized(autorizedRoles : Array<string>): boolean {
    const currentUser: JwtResponse = this.tokenStorageService.getUser();
    if(currentUser) {
      return (
      autorizedRoles 
      ? 
        autorizedRoles.some(role => {
          let index: number = currentUser.roles.findIndex( (roleUser:string) => role === roleUser);
          return index !== -1;
        })
      :
        true
      );
    } else {
      return false;
    }
  }
}
