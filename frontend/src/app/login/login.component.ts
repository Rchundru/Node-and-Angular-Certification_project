import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  id:any;
  userAccess: string="";

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('login', 'yes');
  }
  onSubmit(){
    this.login.username = this.login.username.toLowerCase();
    this._httpClient.post('http://localhost:8080/api/v1/users/login', this.login).subscribe(result =>{
      alert('Login Successful');
      this.id=result.toString();
      localStorage.setItem('id',this.id);
      this._httpClient.get<User>('http://localhost:8080/api/v1/users/find/'+ result).subscribe(result =>{
        this.userAccess=result.userAccess;
        if(this.userAccess=="customer"){
          localStorage.setItem('userAccess', 'customer');
          localStorage.setItem('login', 'no');
          this._router.navigate(['/profile/', this.id]);

        }else{
          //console.log(this.userAccess)
          localStorage.setItem('userAccess', 'admin');
          localStorage.setItem('login', 'no');
          this._router.navigate(['/admin-edit-users']);
          //console.log(this.userAccess)
        }
      })
      //this._router.navigate(['/profile/', result]);
    }, error => {
      console.log(error);
      alert("Incorrect email or password, please try again");
    });
  }

  register(){
    this._router.navigate(['/register']);
  }

}
