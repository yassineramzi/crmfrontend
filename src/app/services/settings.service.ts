import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { ThemeSettings } from "../models/themeSettings.model";

type EntityResponseType = HttpResponse<ThemeSettings>;

@Injectable({providedIn: 'root'})
export default class SettingsService {
    private resourceUrl = environment.api_url + 'api/settings';

    constructor(
        private http: HttpClient
        ) {
    }

    public create(settings: ThemeSettings): Observable<EntityResponseType> {
        return this.http.post<ThemeSettings>(this.resourceUrl + '/create', settings, {observe: 'response'});
    }
    
    public getSettingsBySociete(societeId: number): Observable<EntityResponseType> {
        return this.http.get<ThemeSettings>(`${this.resourceUrl}/${societeId}` + '/societe', {observe: 'response'});
    }
}
