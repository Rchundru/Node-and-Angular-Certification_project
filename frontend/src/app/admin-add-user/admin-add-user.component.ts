import { Component, OnInit, ɵresetJitOptions } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../directives/must-match.validator';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  user: User = new User();
  confirmPass: string="";
  userForm: any;

  constructor(private _formbuilder: FormBuilder,private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.userForm=this._formbuilder.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      userAccess:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', [Validators.required]]
    }, {validator: MustMatch('password', 'confirmPassword')})
  }

  get f() {
    return this.userForm.controls;
  }
  onSubmit(){
    console.log(this.user);
    this._httpClient.post<User>('http://localhost:8080/api/v1/users/admin-add', this.user).subscribe(result =>{
      alert('Registration Successful');
      this._router.navigate(['/admin-edit-users']);
    }, error => {console.log(error)});
  }

}
