import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Planification } from "../models/planification.model";

type EntityResponseType = HttpResponse<Planification>;
type EntityArrayResponseType = HttpResponse<Planification[]>;

@Injectable({providedIn: 'root'})
export default class PlanificationService {
    private resourceUrl = environment.api_url + 'api/planification';

    constructor(private http: HttpClient) {
    }
    
    public planifierEnMasse(planifications: Array<Planification>): Observable<EntityArrayResponseType> {
        return this.http.post<Planification[]>(this.resourceUrl + '/en-masse', planifications, {observe: 'response'});
    }

    public getPlanificationsByUser(): Observable<EntityArrayResponseType> {
        return this.http.get<Planification[]>(this.resourceUrl + '/all',  {observe: 'response'});
    }
}