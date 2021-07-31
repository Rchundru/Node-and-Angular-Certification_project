import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any = [];
  user: any;
  popup: any = {};

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {

    this._httpClient.get<Array<any>>('http://localhost:8080/api/v1/orders/')
      .subscribe(result => {
        console.log(result);
        this.orders = result;
      }, error => {
        console.log(error);
      })
  }

  process(order: any) {
    console.log("processing")
    var body = {
      _id: order._id,
      name: order.name,
      email: order.email,
      address: order.address,
      city: order.city,
      state: order.state,
      products: order.products
    };
    this._httpClient.post('http://localhost:8080/api/v1/orders/status', body).subscribe(result =>{
      alert('Successfully Processed');
      window.location.reload();
    }, error => {console.log(error)});
  }

  delete(order: any) {
    this._httpClient.get('http://localhost:8080/api/v1/orders/delete/' + order._id)
      .subscribe(result => {
        console.log(result);
        alert('Successfully Removed')
        window.location.reload();
      }, error => {
        console.log(error);
      })
  }
}


// update: _id, rest of order : post
// delete: _id : get