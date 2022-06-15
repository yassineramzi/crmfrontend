import {Component, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import SettingsService from '../../services/settings.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public sidebarMinimized = false;
  public navItems = navItems;
  public logo: any;
  public logoReduced: any;

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService
  ){
    this.logo = {src: 'assets/img/brand/logo.png', width: 89, height: 25, alt: 'DM21'};
    this.logoReduced = {src: 'assets/img/brand/logo_reduced.png', width: 30, height: 30, alt: 'DM21'};
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
  }

}
