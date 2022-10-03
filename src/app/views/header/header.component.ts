import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;
  constructor() { }

  ngOnInit(): void {

    if(sessionStorage.getItem('userDetails')){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  logout(){
    sessionStorage.clear();
    window.location.reload(); // refresh the page so that logout will display
  }

}
