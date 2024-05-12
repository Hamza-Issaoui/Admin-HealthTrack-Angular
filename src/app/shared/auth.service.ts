import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, of, switchMap, tap } from 'rxjs'
import { env } from '../../environment/environment';
import {AuthUtils} from './authUtils'
@Injectable()
export class AuthService {
    private path = env.envUrl
    private authToken: string | undefined;
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
              }
            }),
            catchError((error) => {
              console.error('Error in login:', error);
              throw error;
            })
          );
      }
    
      private storeToken(token: string) {
        this.authToken = token;
        localStorage.setItem('authToken', token);
      }
    
      getAuthToken(): string | undefined {
        const token = localStorage.getItem('authToken');
        return token !== null ? token : this.authToken;
    }
/**
   * Check the authentication status
   */
check(): Observable<boolean> {
  // Check if the user is logged in
  if (this._authenticated) {
    return of(true);
  }

  // Check the access token availability
  if (!this.authToken) {
    return of(false);
  }

  // Check the access token expire date
  if (AuthUtils.isTokenExpired(this.authToken)) {
    return of(false);
  }

  // If the access token exists, and it didn't expire, sign in using it
  return this.signInUsingToken();
  }

/**
   * Sign in using the access token
   */
signInUsingToken(): Observable<any> {
  // Sign in using the token
  const loginUrl = `${this.path}/users/sign-in-with-token`;

  return this._httpClient
    .post(loginUrl, {
      authToken: this.authToken,
    })
    .pipe(
      catchError(() =>
        // Return false
        of(false)
      ),
      switchMap((response: any) => {
        if (response.authToken) {
          this.authToken = response.accessToken;
        }

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
       // this._userService.user = response.user;

        // Return true
        return of(true);
      })
      );
  }



}
