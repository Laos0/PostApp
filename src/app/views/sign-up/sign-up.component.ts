import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { User } from 'src/app/models/user';
import { ResponseCreateUser } from 'src/app/reponses/response-create-user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    
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

    // call the user service to create a new user to send to the backend
    this.userService.createUser(user).subscribe({
      next: (result: ResponseCreateUser) => {

        // if the response json from backend returns a true value for isCreated Then do this
        if(result.isCreated){
          // if succesful creation, take user to Home component and say its name
          this.router.navigate([AppRoutes.HOME]);

          // store user details into session so that we can use it on home component and more...
          sessionStorage.setItem("userDetails", JSON.stringify(result));
        }else{
          // Tell the user that an email with it exists already

        }

          // backend sends a json, we have to stringify it to read it
          console.log("<< Signup component >>: " + JSON.stringify(result));
      },
      error: (e) => {
        console.error(e)
      }
    });;

    // ** TODO ** create user interface and user response
    //console.log(this.signUpForm.get('firstName').value);
  }

  login(){
    this.router.navigate([AppRoutes.LOGIN]);
  }

}
