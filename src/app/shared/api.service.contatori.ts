import { Injectable } from '@angular/core';
import { Student } from './student';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from '../_services/token-storage.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceContatori {

  endpoint: string = environment.apiBaseUrl;
  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  // Count all kits
  GetAllKits() {
    const token = this.tokenStorageService.getToken();
    const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` })
    }
    return this.http.get(`${this.endpoint}/kit/count`, httpOptions);
  }

  // Count active kits
  GetActiveKits() {
    const token = this.tokenStorageService.getToken();
    const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` })
    }
    return this.http.get(`${this.endpoint}/kit/count?where={"personName":{"!=":""}}`, httpOptions);
  }
  // getAdminBoard(): Observable<Kit[]> {
  //   const token = this.tokenStorageService.getToken();
  //   const httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${token}` })
  //   }
  //   return this.http.get<Kit[]>(API_URL + 'kit', httpOptions);
  // }

  // Add student
  AddStudent(data: Student): Observable<any> {
    let API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Add student
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.endpoint}/add-student`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all students
  GetStudents() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get all users
  GetUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  // Get student
  GetStudent(id:any): Observable<any> {
    let API_URL = `${this.endpoint}/read-student/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(catchError(this.errorMgmt))
  }

  // Update student
  UpdateStudent(id:any, data:any): Observable<any> {
    let API_URL = `${this.endpoint}/update-student/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

      // Update user
      UpdateUser(id:any, data:any): Observable<any> {
        let API_URL = `${this.endpoint}/user/${id}`;
        return this.http.put(API_URL, data, { headers: this.headers })
          .pipe(
            catchError(this.errorMgmt)
          )
      }
  // Delete student
  DeleteStudent(id:any): Observable<any> {
    var API_URL = `${this.endpoint}/delete-student/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}