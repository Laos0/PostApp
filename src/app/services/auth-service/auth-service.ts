import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLogin } from 'src/app/reponses/response-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_API: string = "http://localhost:8080/api/v1/auth/login";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(this.AUTH_API, {
      email,
      password
    }, this.httpOptions);
  }
  
  loginTest(){
    console.log(this.AUTH_API);
    return this.http.get(this.AUTH_API);
  }
}
