import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  user: User = new User();

  constructor(private _httpClient: HttpClient, private _router: Router ) { }

  ngOnInit(): void {
    this._httpClient.get<User>("http://localhost:8080/api/v1/users/find/" + localStorage.getItem('id')).subscribe(result => {
      this.user=result;
      console.log(this.user);
    })
  }

  placeorder() {
    let cart = localStorage.getItem('cart');
    let products = [];
    if (cart) {
      for (let item of JSON.parse(cart)) {
        products.push(item.name)
      }
    }
    let order = {
      "name": this.user.firstName + " " + this.user.lastName,
      "email": this.user.username,
      "address": this.user.streetAddress,
      "city": this.user.city,
      "state": this.user.state,
      "products": products
    }
    this._httpClient.post('http://localhost:8080/api/v1/orders/add', order).subscribe(result =>{
      alert('Order Placed Successfully');
      this._router.navigate(['/orders']);
    }, error => {
      alert('Error Placing Order');
      console.log(error);
    });
  }

}
