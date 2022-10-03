import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  getEmail(event: any){
    console.log(event.target.value);
    this.email = event.target.value;
  }

  getPassword(event: any){
    console.log(event.target.value);
    this.password = event.target.value;
  }

  signUp(){
    this.router.navigate([AppRoutes.SIGNUP]);
  }

  login(){
    this.authService.login(this.email, this.password).pipe(take(1), timeout(10000))
    // .pipe(map((res: ResponseLogin) => {
    //   //const r = JSON.stringify(res);
    //   //const d = JSON.parse(r);
    //   return d;
    // }))
    .subscribe({
      next: (result: ResponseLogin) => {
        
        // log the response to see what the json looks like
        console.log("THIS IS THE JSON", result)
        console.log("<< Login component >>", result)
        if(result.isLoggedIn){


          /* ** TODO **
            Backend has to send a json of UserDetails and we have to store userdetail onto the session
          */
          
          sessionStorage.setItem("userDetails", JSON.stringify(result));
          console.log("SUCCESS LOGIN")
          this.router.navigate([AppRoutes.HOME]);
        }else{
          console.error("FAILED LOGIN: FROM login.component.ts")
          this.router.navigate([AppRoutes.ERROR])
        }
        

      },
      error: (e) => {
        console.error(e)
      }
    });
    //console.log(this.email + " " + this.password);
  }

}
