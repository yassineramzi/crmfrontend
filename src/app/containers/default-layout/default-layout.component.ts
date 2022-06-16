import {Component, OnDestroy} from '@angular/core';
import { ThemeSettings } from '../../models/themeSettings.model';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import ThemeService from '../../services/theme.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public logo: any;
  public logoReduced: any;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private themeService: ThemeService
  ){
    const themeSettings: ThemeSettings = this.tokenStorageService.getThemeSettings();
    if(themeSettings){
      this.logo = {src: themeSettings.logoImageBase64, width: 50, height: 50, alt: themeSettings.societe.nom};
      this.logoReduced = {src: themeSettings.favIconImageBase64, width: 40, height: 40, alt: themeSettings.societe.nom};
      this.themeService.applyTheme();
    }else {
      this.logo = {src: 'assets/img/brand/logo.png', width: 89, height: 25, alt: 'DM21'};
      this.logoReduced = {src: 'assets/img/brand/logo_reduced.png', width: 30, height: 30, alt: 'DM21'};
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this.authService.logout();
  }
}
