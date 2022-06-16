import { Injectable } from "@angular/core";
import { ThemeSettings } from "../models/themeSettings.model";
import { TokenStorageService } from "./auth/token-storage.service";

@Injectable({providedIn: 'root'})
export default class ThemeService {

    private themeWrapper = document.querySelector('body');

    constructor(private tokenStorage: TokenStorageService){}

    public applyTheme(): void {
        const themeSettings: ThemeSettings = this.tokenStorage.getThemeSettings();
        if(themeSettings.couleurTheme) {
            this.themeWrapper!.style.setProperty('--themeColor', themeSettings.couleurTheme);
        }
        if(themeSettings.couleurMenuSelectione) {
            this.themeWrapper!.style.setProperty('--selectedElementColor', themeSettings.couleurMenuSelectione);
        }
        if(themeSettings.couleurPolice) {
            this.themeWrapper!.style.setProperty('--policeColor', themeSettings.couleurPolice);
        }
    }

}