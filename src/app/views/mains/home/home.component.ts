import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public firstName: string;

  constructor() { }

  ngOnInit(): void {
    this.firstName = JSON.parse(sessionStorage.getItem("userDetails")).firstName;
  }

  // call this method when post button is clicked
  post(){
    console.log("Creating a post...");
  }

}
