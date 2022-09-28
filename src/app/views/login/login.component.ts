import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
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

  login(){
    this.authService.login(this.email, this.password)
    // .pipe(map((res: ResponseLogin) => {
    //   //const r = JSON.stringify(res);
    //   //const d = JSON.parse(r);
    //   return d;
    // }))
    .subscribe({
      next: (result: ResponseLogin) => {
        
        // log the response to see what the json looks like
        // console.log(result)

        if(result.isLoggedIn){
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
