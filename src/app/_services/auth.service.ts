/**
 * Authentication Service
 * This service sends signup, login HTTP POST requests to back-end.
 */

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

// const AUTH_API = 'http://localhost:3000/api/auth/';

// SAILS BE
// const AUTH_API = 'http://localhost:1337/';
const AUTH_API = environment.apiBaseUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // passo al costruttore HttpClient
  constructor(private http: HttpClient) { }

  /**
   * Chiamata al BE POST: http://localhost:3030/api/auth/signin
   * @param username 
   * @param password 
   * 
   * RESPONSE:
   *  {
   *      "id": 1,
   *      "username": "admin",
   *      "email": "admin@admin.com",
   *      "roles": [
   *          "ROLE_USER"
   *      ],
   *      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEzNDM1Nzk4LCJleHAiOjE2MTM1MjIxOTh9.PybB1KnJMLr9_yfXdViD1Vp3IVxwFDoyfnRA5HQAOz0"
   *  }
   */
  //login(username: string, password: string): Observable<any> {
  login(email: string, password: string): Observable<any> {
    //return this.http.post(AUTH_API + 'signin', {
      console.log("fase di login");
    return this.http.post(AUTH_API + '/login', {
      //username,
      email,
      password
    }, httpOptions);
  }

  /**
   * http://localhost:3030/api/auth/signup
   * @param username 
   * @param email 
   * @param password 
   * 
   * 
   * Request:
   * {
   *    "username": "utente",
   *    "email": "utente@utente.com",
   *    "password": "utente",
   *    "roles": 1
   * }
   * 
   */
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

}
