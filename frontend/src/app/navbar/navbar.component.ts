import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id:any;
  userAccess:any;
  loginPage:any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.userAccess=localStorage.getItem('userAccess');
    this.loginPage=localStorage.getItem('login');
  }

  navToProfile(){
    console.log("entered");
    this.id=localStorage.getItem('id');
    if(this.id){
      this._router.navigate(['/profile/',this.id]);
    }else{
      this._router.navigate(['/login'])
    }
  }
}
