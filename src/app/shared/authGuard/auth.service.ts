import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, catchError, of, switchMap, tap } from 'rxjs'

import { env } from '../../../environment/environment';
import {AuthUtils} from './authUtils'


@Injectable({ providedIn: 'root' })
export class AuthService {
    private path = env.envUrl
     authToken: any | undefined;
    private _authenticated: boolean = false;

    constructor(private _httpClient: HttpClient) { }

    register(userData: any) {
        const url = `${this.path}/auth/register`
        return this._httpClient.post(url, userData)
    }

    login(userData: any) {
        const url = `${this.path}/auth/login`;
        return this._httpClient.post(url, userData)
          .pipe(
            tap((res: any) => {
              if (res.success) {
                this.storeToken(res.token);
                this.authToken = res.token
              }
            }),
            catchError((error) => {
              console.error('Error in login:', error);
              throw error;
            })
          );
      }

      signOut() {
        localStorage.removeItem('authToken');
      }

      forgotPassword(email: string): Observable<any> {
        const url = `${this.path}/auth/forgot-password`;
        return this._httpClient.post(url, { email });
    }

    resetPassword(newPassword: string, resetToken: string): Observable<any> {
        const url = `${this.path}/auth/reset-password`;
        return this._httpClient.post(url, { newPassword, resetToken });
    }
    
      private storeToken(token: string) {
        this.authToken = token;
        localStorage.setItem('authToken', token);
      }
    
      getAuthToken(): string | undefined {
        return this.authToken !== null ? this.authToken : this.authToken;
    }
/**
   * Check the authentication status
   */
check(): Observable<boolean> {
  // Check if the user is logged in
  this.authToken = localStorage.getItem('authToken');
  if (this._authenticated) {
    return of(true);
  }
  console.log("authenticated111", this._authenticated);

  console.log("authenticated00000", this.authToken);

  // Check the access token availability
  if (!this.authToken) {
    return of(false);
  }
  console.log("authenticated222", this._authenticated);

  // Check the access token expire date
  if (AuthUtils.isTokenExpired(this.authToken)) {
    return of(false);
  }
  console.log("authenticated3333", this._authenticated);

  // If the access token exists, and it didn't expire, sign in using it
  return this.signInUsingToken();
  }

/**
   * Sign in using the access token
   */
signInUsingToken(): Observable<any> {
  // Check if accessToken is in sessionStorage
  const storedAccessToken = localStorage.getItem('authToken')
  if (!storedAccessToken) {
    // Redirect to sign-in if accessToken is not found
    window.location.href = '/login'
    return of(false)
  }

  // Parse stored user data
 // const user = JSON.parse(storedUser)

  // Set the necessary session storage items for user data
  // sessionStorage.setItem('idConnected', user.id)
  // sessionStorage.setItem('companyId', user.companyId)
  // sessionStorage.setItem('userProfile', user.profiles[0]?.title)
  // sessionStorage.setItem('profileId', user.profiles[0]?.id)

  console.log("authenticatedBefore", this._authenticated);

  // Set the authenticated flag to true
  this._authenticated = true
  console.log("authenticatedAfter", this._authenticated);

  // Store the user on the user service
  //this._userService.user = user

  // Return true
  return of(true)
  }



}
