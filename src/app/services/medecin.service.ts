import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import CritereRechercheMedecin from "../models/critereRechercheMedecin.model";
import Medecin from "../models/medecin.model";

type EntityResponseType = HttpResponse<Medecin>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({providedIn: 'root'})
export default class MedecinService {
    private resourceUrl = environment.api_url + 'api/medecins';

    constructor(private http: HttpClient) {
    }
    
    public search(critereRechercheMedecin: CritereRechercheMedecin): Observable<EntityArrayResponseType> {
        return this.http.post<Medecin[]>(this.resourceUrl + '/search', critereRechercheMedecin, {observe: 'response'});
    }

    public findById(id: number): Observable<EntityResponseType> {
        return this.http.get<Medecin>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    public update(medecin: Medecin): Observable<EntityResponseType> {
        return this.http.put<Medecin>(`${this.resourceUrl}`, medecin, {observe: 'response'});
    }

}
