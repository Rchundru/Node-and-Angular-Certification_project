import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:any;
  user: User = new User();
  userAccess:any;

  constructor(private _route: ActivatedRoute, private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.id=this._route.snapshot.paramMap.get('id');
    this._httpClient.get<User>("http://localhost:8080/api/v1/users/find/" + this.id).subscribe(result => {
      this.user=result;
      this.userAccess= localStorage.getItem('userAccess');
        console.log(this.userAccess);
      console.log(this.user);
    })
  }

  logout(){

    this._httpClient.get("http://localhost:8080/api/v1/users/logout").subscribe(result => {
      console.log(result);
      this._router.navigate(['/']);
      localStorage.clear;
    })
  }

}
