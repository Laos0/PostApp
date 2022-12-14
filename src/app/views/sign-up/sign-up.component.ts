import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, take, timeout } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';
import { ConsoleColor } from 'src/app/libs/console-color';
import { IUser } from 'src/app/models/iuser';
import { User } from 'src/app/models/user';
import { ResponseCreateUser } from 'src/app/reponses/response-create-user';
import { AuthService } from 'src/app/services/auth-service/auth-service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  public isEmailTaken: boolean;

  public _onSignUpReturned = new ReplaySubject<boolean>(1);
  public onSignUpReturned$ = this._onSignUpReturned.asObservable();

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private changeRef: ChangeDetectorRef,
    private authService: AuthService) { }

  ngOnInit(): void {
    
    // TODO: need to add in more validators, maybe regex to prevent swear words
    this.signUpForm = this.fb.group({
      firstName: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
      lastName: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur' 
        }
      ],
      email: [
        '',
        {
          validators: [
            Validators.required, 
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
          ],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    });

  }

  getFirstName() {return this.signUpForm.get('firstName').value;}
  getLastName() {return this.signUpForm.get('lastName').value;}
  getEmail() {return this.signUpForm.get('email').value;}
  getPassword() {return this.signUpForm.get('password').value;}

  submitSignUpForm(){

    // create the user based on the form
    let user = new User(this.getFirstName(), this.getLastName(), 
      this.getEmail(), this.getPassword());

    /* interface way instead of using class
    const iuser: IUser = {
      firstName: this.getFirstName(),

    }

    */

    // call the user service to create a new user to send to the backend
    this.userService.createUser(user).pipe(take(1), timeout(10000)).subscribe({
      next: (result: ResponseCreateUser) => {

        console.log(" email already exist", result);

        // if the response json from backend returns a true value for isCreated Then do this
        if(result.isCreated){
          // if succesful creation, take user to Home component and say its name
          this.router.navigate([AppRoutes.HOME]);

          // store user details into session so that we can use it on home component and more...
          sessionStorage.setItem("userDetails", JSON.stringify(result));
          console.log("<<  THIS IS THE NEW USER >>: ", result);
        }else{
          // Tell the user that an email with it exists already
          console.log("%c email already exist", ConsoleColor.RED);

        }

          // backend sends a json, we have to stringify it to read it
          console.log("<< Signup component >>: " + JSON.stringify(result));

          this.authService.loginSuccess();
      },
      error: (e) => {
        // If the server returns 400, then it means the email already existed
        // since in mysql database I made email unique
        this.isEmailTaken = true; // flag isEmailTaken to true as the server has responsed 400
        this._onSignUpReturned.next(true); // once the subscription has error, we will notified the observer 
        this.changeRef.detectChanges(); // tell this view there were changes made an update the view
        console.error("Bad request: 400", e)
      }
    });;

    // ** TODO ** create user interface and user response
    //console.log(this.signUpForm.get('firstName').value);
  }

  login(){
    this.router.navigate([AppRoutes.LOGIN]);
  }

}
