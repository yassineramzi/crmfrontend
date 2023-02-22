import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import Materiel from '../models/materiel.model';
import CritereRechercheMateriel from '../models/critereRechercheMateriel.model';

type EntityResponseType = HttpResponse<Materiel>;
type EntityArrayResponseType = HttpResponse<Materiel[]>;

@Injectable({providedIn: 'root'})
export default class MaterielService {

    private resourceUrl = environment.api_url + 'api/materiels';

    constructor(private http: HttpClient) {
    }

    public create(materiel: Materiel): Observable<EntityResponseType> {
        return this.http.post<Materiel>(this.resourceUrl + '/create', materiel, {observe: 'response'});
    }

    public update(materiel: Materiel): Observable<EntityResponseType> {
        return this.http.put<Materiel>(this.resourceUrl + '/update', materiel, {observe: 'response'});
    }

    public search(critereRechercheMateriel: CritereRechercheMateriel): Observable<EntityArrayResponseType> {
        return this.http.post<Materiel[]>(this.resourceUrl + '/search', critereRechercheMateriel, {observe: 'response'});
    }

    public delete(id: number) : Observable<HttpResponse<void>> {
        return this.http.delete<void>(this.resourceUrl + '/' + id + '/delete',  {observe: 'response'});
    }
}