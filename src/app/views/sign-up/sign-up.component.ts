import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { User } from 'src/app/reponses/response-user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

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


  submitSignUpForm(){


    // ** TODO ** create user interface and user response
    console.log(this.signUpForm.get('firstName').value);
  }

  login(){
    this.router.navigate([AppRoutes.LOGIN]);
  }

}
