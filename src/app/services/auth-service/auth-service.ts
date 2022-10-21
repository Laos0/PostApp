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


  // our subject and observables to handle aysnc data
  private _onLoginReturned: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public onLoginReturned$: Observable<boolean> = this._onLoginReturned.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // sending email and password to endpoint to login
  login(email: string, password: string): Observable<ResponseLogin>{
    console.log("This is the endpoint", ApiEndPoints.USER_LOGIN, ConsoleColor.GREEN);

    // TODO: instead of sending in email and password, we need to send in an interface
    return this.http.post<ResponseLogin>(ApiEndPoints.USER_LOGIN, {
      email,
      password
    }, this.httpOptions);
  }
  
  // test method, can be ignored
  loginTest(){
    console.log(ApiEndPoints.USER_LOGIN);
    return this.http.get(ApiEndPoints.USER_LOGIN);
  }

  // alert the subject to return true
  loginSuccess(){
    this._onLoginReturned.next(true);
  }

  // alert the subject to return false
  logoutSuccess(){
    this._onLoginReturned.next(false);
  }


}
