import { Injectable } from '@angular/core';
import { JwtResponse } from '../../models/jwtResponse.model';
import { ThemeSettings } from '../../models/themeSettings.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const THEME_SETTINGS_KEY = 'theme-settings';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public clearSession(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: JwtResponse): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): JwtResponse {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public saveThemeSettings(themeSettings: ThemeSettings): void {
    window.localStorage.removeItem(THEME_SETTINGS_KEY);
    window.localStorage.setItem(THEME_SETTINGS_KEY, JSON.stringify(themeSettings));
  }

  public getThemeSettings(): ThemeSettings {
    const themeSettings = window.localStorage.getItem(THEME_SETTINGS_KEY);
    if (themeSettings) {
      return JSON.parse(themeSettings);
    }
    return null;
  }
}
