import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { AuthService } from "./auth-service";

// this is how you annotate a fake dependency or a mock service
@Injectable()
export class AuthServiceMock {


  public login: jasmine.Spy = spyOn(AuthService.prototype, 'login');  
  public loginSuccess: jasmine.Spy = spyOn(AuthService.prototype, 'loginSuccess');  
  public logoutSuccess: jasmine.Spy = spyOn(AuthService.prototype, 'logoutSuccess');  

  public _onLoginReturned = new ReplaySubject<boolean>(1);
  public onLoginReturned$ = this._onLoginReturned.asObservable();

}
