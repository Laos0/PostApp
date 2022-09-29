import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AppRoutes } from 'src/app/app-routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstName: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.firstName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
  }

  // call this method when post button is clicked
  post(){
    this.router.navigate([AppRoutes.POST]);
    console.log("Creating a post...");
  }

}
