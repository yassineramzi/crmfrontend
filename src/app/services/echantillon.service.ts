import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import Echantillon from '../models/echantillon.model';
import CritereRechercheEchantillon from '../models/critereRechercheEchantillon.model';

type EntityResponseType = HttpResponse<Echantillon>;
type EntityArrayResponseType = HttpResponse<Echantillon[]>;

@Injectable({providedIn: 'root'})
export default class EchantillonService {
    private resourceUrl = environment.api_url + 'api/echantillons';

    constructor(private http: HttpClient) {
    }

    public create(echantillon: Echantillon): Observable<EntityResponseType> {
        return this.http.post<Echantillon>(this.resourceUrl + '/create', echantillon, {observe: 'response'});
    }

    public update(echantillon: Echantillon): Observable<EntityResponseType> {
        return this.http.put<Echantillon>(this.resourceUrl + '/update', echantillon, {observe: 'response'});
    }

    public search(critereRechercheEchantillon: CritereRechercheEchantillon): Observable<EntityArrayResponseType> {
        return this.http.post<Echantillon[]>(this.resourceUrl + '/search', critereRechercheEchantillon, {observe: 'response'});
    }

    public delete(id: number) : Observable<HttpResponse<void>> {
        return this.http.delete<void>(this.resourceUrl + '/' + id + '/delete',  {observe: 'response'});
    }
}