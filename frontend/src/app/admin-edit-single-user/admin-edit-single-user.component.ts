import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-edit-single-user',
  templateUrl: './admin-edit-single-user.component.html',
  styleUrls: ['./admin-edit-single-user.component.css']
})
export class AdminEditSingleUserComponent implements OnInit {

  id:any;
  user: User = new User();

  constructor(private _route: ActivatedRoute, private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.id=this._route.snapshot.paramMap.get('id');
    this._httpClient.get<User>("http://localhost:8080/api/v1/users/find/" + this.id).subscribe(result => {
      this.user=result;
      console.log(this.user);
    })
  }

  logout(){

    this._httpClient.get("http://localhost:8080/api/v1/users/logout").subscribe(result => {
      console.log(result);
      this._router.navigate(['/']);
    })
  }

  editUser(){
    this._httpClient.post("http://localhost:8080/api/v1/users/edit",  this.user).subscribe(result =>{
      alert(result);
      this._router.navigate(['/login']);
    }, error => {console.log(error)});
  }

}
