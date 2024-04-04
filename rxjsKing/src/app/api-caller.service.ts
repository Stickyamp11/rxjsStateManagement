import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


interface User{
  email: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  baseUrl: string = "https://dummyjson.com/auth/login";

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let body = {
      username: 'kminchelle',
      password: '0lelplR',
      expiresInMins: 30 // optional, defaults to 60
    };
    return this.http.post<User>(this.baseUrl,body, { headers });
  }
}
