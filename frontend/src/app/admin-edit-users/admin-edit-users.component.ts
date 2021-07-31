import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-edit-users',
  templateUrl: './admin-edit-users.component.html',
  styleUrls: ['./admin-edit-users.component.css']
})
export class AdminEditUsersComponent implements OnInit {

  userList: any;
  userAccess:any;

  constructor(private _httpClient: HttpClient, private _router:Router) { }

  ngOnInit(): void {
    this._httpClient.get('http://localhost:8080/api/v1/users/getall')
      .subscribe(result => {
        this.userList = result;
        this.userAccess= localStorage.getItem('userAccess');
        console.log(this.userAccess);
      }, error => {
        console.log(error);
      })
  }

  deleteUser(id:any){
    console.log("entered")
    console.log(id)
    this._httpClient.get('http://localhost:8080/api/v1/users/delete/'+id).subscribe(result =>{
      this._router.navigate(['admin-edit-users']);
    })
    window.location.reload();
  }

}
