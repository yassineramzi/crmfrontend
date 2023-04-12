import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import Position from '../models/position.model';
import CritereRecherchePosition from '../models/critereRecherchePosition.model';

type EntityResponseType = HttpResponse<Position>;
type EntityArrayResponseType = HttpResponse<Position[]>;

@Injectable({providedIn: 'root'})
export default class PositionService {
    private resourceUrl = environment.api_url + 'api/positions';

    constructor(private http: HttpClient) {
    }

    public create(position: Position): Observable<EntityResponseType> {
        return this.http.post<Position>(this.resourceUrl + '/create', position, {observe: 'response'});
    }

    public update(position: Position): Observable<EntityResponseType> {
        return this.http.put<Position>(this.resourceUrl + '/update', position, {observe: 'response'});
    }

    public search(critereRecherchePosition: CritereRecherchePosition): Observable<EntityArrayResponseType> {
        return this.http.post<Position[]>(this.resourceUrl + '/search', critereRecherchePosition, {observe: 'response'});
    }

    public delete(id: number): Observable<HttpResponse<void>> {
        return this.http.delete<void>(this.resourceUrl + '/' + id + '/delete',  {observe: 'response'});
    }

    public findById(id: number): Observable<EntityResponseType> {
        return this.http.get<Position>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }
}