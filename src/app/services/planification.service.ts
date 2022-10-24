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

    public create(planification: Planification): Observable<EntityResponseType> {
        return this.http.post<Planification>(this.resourceUrl + '/create', planification, {observe: 'response'});
    }
    
    public planifierEnMasse(planifications: Array<Planification>): Observable<EntityArrayResponseType> {
        return this.http.post<Planification[]>(this.resourceUrl + '/en-masse', planifications, {observe: 'response'});
    }

    public getPlanificationsByUser(userId: number): Observable<EntityArrayResponseType> {
        return this.http.get<Planification[]>(`${this.resourceUrl}/${userId}` + '/utilisateur',  {observe: 'response'});
    }

    public getPlanificationsByUserAndMedecin(userId: number, medecinId: number): Observable<EntityArrayResponseType> {
        return this.http.get<Planification[]>(`${this.resourceUrl}/${userId}` + '/utilisateur/' + `${medecinId}` + '/medecin',  {observe: 'response'});
    }

}