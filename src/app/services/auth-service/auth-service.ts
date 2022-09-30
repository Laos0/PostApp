import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { ResponseLogin } from 'src/app/reponses/response-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // sending email and password to endpoint to login
  login(email: string, password: string): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(ApiEndPoints.USER_LOGIN, {
      email,
      password
    }, this.httpOptions);
  }
  
  loginTest(){
    console.log(ApiEndPoints.USER_LOGIN);
    return this.http.get(ApiEndPoints.USER_LOGIN);
  }
}
