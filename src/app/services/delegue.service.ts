import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import Delegue from '../models/delegue.model';
import CritereRechercheDelegue from '../models/critereRechercheDelegue.model';

type EntityResponseType = HttpResponse<Delegue>;
type EntityArrayResponseType = HttpResponse<Delegue[]>;

@Injectable({providedIn: 'root'})
export default class DelegueService {
    private resourceUrl = environment.api_url + 'api/management/societe';

    constructor(private http: HttpClient) {
    }

    public create(delegue: Delegue): Observable<EntityResponseType> {
        return this.http.post<Delegue>(this.resourceUrl + '/delegue/create', delegue, {observe: 'response'});
    }

    public update(delegue: Delegue): Observable<EntityResponseType> {
        return this.http.put<Delegue>(this.resourceUrl + '/delegue/update', delegue, {observe: 'response'});
    }

    public search(critereRechercheDelegue: CritereRechercheDelegue): Observable<EntityArrayResponseType> {
        return this.http.post<Delegue[]>(this.resourceUrl + '/search', critereRechercheDelegue, {observe: 'response'});
    }

    public findAll(idSociete: number): Observable<EntityArrayResponseType> {
        return this.http.get<Delegue[]>(this.resourceUrl +'/'+idSociete+ '/delegues', {observe: 'response'});
    }

    public delete(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(this.resourceUrl + '/delegue/' + id + '/delete',  {observe: 'response'});
    }
}