import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { ConsoleColor } from 'src/app/libs/console-color';
import { ResponseLogin } from 'src/app/reponses/response-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _onLoginReturned: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public onLoginReturned$: Observable<boolean> = this._onLoginReturned.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // sending email and password to endpoint to login
  login(email: string, password: string): Observable<ResponseLogin>{
    console.log("This is the endpoint", ApiEndPoints.USER_LOGIN, ConsoleColor.GREEN);
    return this.http.post<ResponseLogin>(ApiEndPoints.USER_LOGIN, {
      email,
      password
    }, this.httpOptions);
  }
  
  loginTest(){
    console.log(ApiEndPoints.USER_LOGIN);
    return this.http.get(ApiEndPoints.USER_LOGIN);
  }

  loginSuccess(){
    this._onLoginReturned.next(true);
  }

  logoutSuccess(){
    this._onLoginReturned.next(false);
  }


}
