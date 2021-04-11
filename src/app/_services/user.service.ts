/**
 * Data Service
 * This service provides methods to access public and protected resources.
 * _services/user.service.ts
 */

 import { Injectable } from '@angular/core';

 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { TokenStorageService } from './token-storage.service';
 
 import { Observable } from 'rxjs';
 
 import { Kit } from '../models/kit.model';
 import { environment } from '../../environments/environment';
 
 //const API_URL = 'http://localhost:3000/api/test/';
 
//  const API_URL = 'http://localhost:1337/';
 const API_URL = environment.apiBaseUrl;
 
 
 @Injectable({
   providedIn: 'root'
 })
 export class UserService {
 
   constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }
 
   getPublicContent(): Observable<any> {
     return this.http.get(API_URL + 'all', { responseType: 'text' });
   }
 
   getUserBoard(): Observable<any> {
     return this.http.get(API_URL + 'user', { responseType: 'text' });
   }
 
   getModeratorBoard(): Observable<any> {
     return this.http.get(API_URL + 'mod', { responseType: 'text' });
   }
 
   getAdminBoard(): Observable<Kit[]> {
     const token = this.tokenStorageService.getToken();
     const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}` })
     }
     return this.http.get<Kit[]>(API_URL + '/kit', httpOptions);
   }
 
 }