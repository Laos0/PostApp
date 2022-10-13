import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, ReplaySubject, Subject, take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { ApiEndPoints } from 'src/app/libs/apiPaths';
import { ConsoleColor } from 'src/app/libs/console-color';
import { ILoginRes } from 'src/app/models/ilogin-res';
import { ResponseLogin } from 'src/app/reponses/response-login';
import { AuthService } from 'src/app/services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  public _onLoginReturned = new ReplaySubject<boolean>(1);
  public onLoginReturned$ = this._onLoginReturned.asObservable();

  public incorrectPassword: boolean = false;
  public incorrectEmail: boolean = false;

  constructor(private authService: AuthService, private router: Router, private changeRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    
  }

  // get the user's input on email
  getEmail(event: any){
    this.email = event.target.value;
  }

  // get the user's input on password
  getPassword(event: any){
    this.password = event.target.value;
  }

  signUp(){
    this.router.navigate([AppRoutes.SIGNUP]);
  }

  login(){
    this.authService.login(this.email, this.password)
      .pipe(take(1), timeout(10000))
      .subscribe({
        next: (res: ResponseLogin) => {

          // log the response to see what the json looks like
          //console.log("<< Login component >>", res)

          // if the query is good on the backend
          if(res.isQueryGood){
            // if the email exists
            if(res.emailExist){
                // if the password matches
                if(res.passwordMatch){
                    // if the user successfully loggedin
                    if(res.isLoggedIn){
                        // store the user's detail into session storage for future uses
                        sessionStorage.setItem("userDetails", JSON.stringify(res));
                        console.log("%c SUCCESS LOGIN", ConsoleColor.GREEN)
                        this.incorrectEmail = false;
                        this.incorrectPassword = false;
                        this.authService.loginSuccess();
                
                        // The log in is successful, redirect the user to the home page
                        this.router.navigate([AppRoutes.HOME]);
                    }
                }else{
                    // if the password did not match
                    this.incorrectPassword = true;
                    this.incorrectEmail = false;
                    console.error("%c PASSWORD DONT MATCH: FROM login.component.ts", ConsoleColor.RED)
                    //this.router.navigate([AppRoutes.ERROR])
                }
            }else{
                // if the email does not exist
                this.incorrectEmail = true;
                this.incorrectPassword = false;
                console.log("%c << Login Component >> Email does not exist", ConsoleColor.RED)
            }
          }else{
              // if the query is bad
              console.log("THE QUERY FOR LOGIN IS BAD")
          }
          
        },
        error: (e) => {
          console.error("<< Login Error >>", e)
        },
        complete: () => {

          // Once the subscribe is completed, we will flag one of the two booleans
          // isThereEmail and 
          this._onLoginReturned.next(true);
          
          // once we asign this.incorrectEmail we need to update the view after the subscription is completed
          this.changeRef.detectChanges();
          console.log("Subscribe completed: ", this.onLoginReturned$)
        }
      });
    //console.log(this.email + " " + this.password);
  }

}
