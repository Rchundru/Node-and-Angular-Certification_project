import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  user: any;
  popup: any = {};

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this._httpClient.get<User>('http://localhost:8080/api/v1/users/find/' + localStorage.getItem('id'))
      .subscribe(result => {
        console.log(result);
        this.user = result;
      }, error => {
        console.log(error);
      })

    this._httpClient.get<Array<any>>('http://localhost:8080/api/v1/orders/')
      .subscribe(result => {
        console.log(result);
        for (let order of result) {
          if (order.email == this.user.username) {
            this.orders.push(order);
          }
        }
      }, error => {
        console.log(error);
      })
  }

  openpopup(order: any) {
    this.popup = {
      "name": order.name,
      "address": order.address,
      "address2": order.city + ", " + order.state,
      "products": order.products.join(", ")
    }
  }
}
