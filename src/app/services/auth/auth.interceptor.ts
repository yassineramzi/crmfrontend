import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenStorageService: TokenStorageService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    let authReq = req;
    const token = this.tokenStorageService.getToken();

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next
      .handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.spinnerService.hide();
          if (error.error instanceof ErrorEvent) {
            // handle client-side error
          } else {
            switch (error.status) {
              case 401: //login
                {
                  this.tokenStorageService.clearSession();
                  this.router.navigate(['/login']);
                }
                break;
              case 403: //forbidden
                break;
              case 404: //not found
                break;
              case 500: //internal server error
                {
                  this.tokenStorageService.clearSession();
                  this.router.navigate(['/login']);
                }
                break;
            }
          }
          return throwError(error);
        })
      )
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.hide();
        }
        return evt;
      }));
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
