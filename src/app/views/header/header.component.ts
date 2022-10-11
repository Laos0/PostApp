import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { AuthService } from 'src/app/services/auth-service/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  public _onLoginReturned = new ReplaySubject<boolean>(1);
  public onLoginReturned$ = this._onLoginReturned.asObservable();

  
  constructor(private changeRef: ChangeDetectorRef, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.onLoginReturned$.subscribe({
      next: (res) => {

        this._onLoginReturned.next(res);
        //this.changeRef.detectChanges();
      }
    });

  }


  logout(){
    sessionStorage.clear();
    
    this.authService.logoutSuccess();

  }

  returnToHome(){
    this.router.navigate([AppRoutes.HOME]);
  }

}
