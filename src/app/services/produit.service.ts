import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import Produit from '../models/produit.model';
import CritereRechercheProduit from '../models/critereRechercheProduit.model';

type EntityResponseType = HttpResponse<Produit>;
type EntityArrayResponseType = HttpResponse<Produit[]>;

@Injectable({providedIn: 'root'})
export default class ProduitService {
    private resourceUrl = environment.api_url + 'api/produits';

    constructor(private http: HttpClient) {
    }

    public create(produit: Produit): Observable<EntityResponseType> {
        return this.http.post<Produit>(this.resourceUrl + '/create', produit, {observe: 'response'});
    }

    public search(critereRechercheProduit: CritereRechercheProduit): Observable<EntityArrayResponseType> {
        return this.http.post<Produit[]>(this.resourceUrl + '/search', critereRechercheProduit, {observe: 'response'});
    }
}