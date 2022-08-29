import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";

import { environment } from "../../environments/environment";
import CritereRechercheMedecin from "../models/critereRechercheMedecin.model";
import Medecin from "../models/medecin.model";

type EntityResponseType = HttpResponse<Medecin>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: "root" })
export default class MedecinService {
  private resourceUrl = environment.api_url + "api/medecins";

  dataArrayPage: Medecin[] 

  constructor(private http: HttpClient) {}

  public search(
    critereRechercheMedecin: CritereRechercheMedecin
  ): Observable<EntityArrayResponseType> {
    return this.http.post<any[]>(
      this.resourceUrl + "/search",
      critereRechercheMedecin,
      { observe: "response" }
    );
  }

  httpHeaders = new HttpHeaders().set("Content-Type", "application/json");




  
  //addMedecin(data: Medecin): Observable<any> {
    //console.log('----------------- ADD ----------------- ')
   // console.log(data)
   // let Api_Url = `${this.resourceUrl}`;

  //  return this.http.post(Api_Url, data).pipe(catchError(this.handleError));
 // }

  getMedecins() {
    return this.http.get(this.resourceUrl);
  }

  getMedecin(id: any): Observable<any> {
    let API_URL = `${this.resourceUrl}\ ${id}`;
    return this.http.post(API_URL, { headers: this.httpHeaders }).pipe(
      map((result: any) => {
        return result || {};
      }),
      catchError(this.handleError)
    );
  }

  updateMedecin(id: any, data: Medecin): Observable<any> {
    let API_URL = `${this.resourceUrl}\ ${id}`;
    return this.http.put(API_URL, data, { headers: this.httpHeaders }).pipe(
      map((result: any) => {
        return result || {};
      }),
      catchError(this.handleError)
    );
  }


  

  deleteMedecin(id: any): Observable<any> {
    let API_URL = `${this.resourceUrl}\ ${id}`;
    return this.http.delete(API_URL, { headers: this.httpHeaders }).pipe(
      map((result: any) => {
        return result || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code:${error.status}\n Message: ${error.message} `;
    }
    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
