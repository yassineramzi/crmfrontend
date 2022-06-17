import { Injectable } from "@angular/core";
import { ThemeSettings } from "../models/themeSettings.model";
import { TokenStorageService } from "./auth/token-storage.service";

@Injectable({providedIn: 'root'})
export default class ThemeService {

    private themeWrapper = document.querySelector('body');
    private favIcon: HTMLLinkElement = document.querySelector('#appIcon');
    private title: HTMLTitleElement = document.querySelector('#appTitle');
    private titleSufix: string = ' - DM21';

    constructor(private tokenStorage: TokenStorageService){}

    public applyTheme(): void {
        const themeSettings: ThemeSettings = this.tokenStorage.getThemeSettings();
        if(themeSettings){
            if(themeSettings.societe){
                this.title.text = themeSettings.societe.nom+this.titleSufix;
            }
            if(themeSettings.favIconImageBase64){
                this.favIcon.href = themeSettings.favIconImageBase64;
            }
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

}