import { Injectable, OnInit } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin: boolean;
  userProfile: any;

  public lock = new Auth0Lock(environment.auth.clientID, environment.auth.domain, {
    autoclose: true,
    auth: {
      redirectUrl: environment.auth.callbackURL,
      responseType: environment.auth.responseType,
      audience: environment.auth.audience,
      params: {
        scope: environment.auth.scope
      }
    }
  });

  constructor(public router: Router) {
    if (localStorage.getItem('profile')) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this._checkAdmin();
    }

  }

  public login(): void {
    this.lock.show();
  }

  // Call this method in app.component.ts
  // if using path-based routing
  public handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      console.log('user is authenticated');
      if (authResult && authResult.accessToken) {
        // this.setSession(authResult);
        // this.router.navigate(['/']);
        this._getProfile(authResult);
      }
    });
    this.lock.on('authorization_error', (err) => {
      this.router.navigate(['/']);
      console.log(err);
      alert(`Error: ${err.error}. Check the console for further details.`);
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
        this.router.navigate(['/']);
        // this._redirect();
      } else if (err) {
        console.warn(`Error retrieving profile: ${err.error}`);
      }
    });
  }

  private _setSession(authResult, profile): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    if (profile) {
      // console.log('User profile set', profile);
      localStorage.setItem('profile', JSON.stringify(profile));
      this.userProfile = profile;
      //this.isAdmin = this._checkAdmin();
      this._checkAdmin();
    }
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public renewSession(): void {
    this.lock.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this._setSession(authResult, this.userProfile);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.errorDescription}).`);
        this.logout();
      }
    });
  }

  private _checkAdmin() {
    // Check if the user has admin role
    const roles = this.userProfile[environment.auth.namespace] || [];
    this.isAdmin = roles.indexOf('admin') > -1;
  }
}
