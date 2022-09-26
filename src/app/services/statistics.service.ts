import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import EchelleAdoption from '../models/echelleAdoption.model';

type EntityResponseType = HttpResponse<EchelleAdoption>;

@Injectable({providedIn: 'root'})
export default class StatisticsService {
    private resourceUrl = environment.api_url + 'api/statistics';

    constructor(
        private http: HttpClient
        ) {
    }


    public getEchelleAdoptionByMedecinAndSociete(idMedecin: number, idSociete: number): Observable<EntityResponseType> {
        return this.http.get<EchelleAdoption>(`${this.resourceUrl}/echelle-adoption/${idMedecin}/medecin/${idSociete}/societe`, {observe: 'response'});
    }
}
