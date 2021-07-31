import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  productList: any = [];
  isAdmin: Boolean;

  constructor(private _httpClient: HttpClient) {
    this.isAdmin = localStorage.getItem('userAccess') == 'admin' ? true : false;
  }

  ngOnInit(): void {

      this._httpClient.get<any>('http://localhost:8080/products')
      .subscribe(result => {
        for (let res of result["productList"]) {
          if (res.discountPrice != res.price) {
            this.productList.push(res);
          }
        }
      }, error => {
        console.log((error)); 
      })
  }

  addtocart(product: any) {
    console.log(product);
    let cart = localStorage.getItem('cart');
    if (cart) {
      let temp = JSON.parse(cart);
      temp.push(product);
      localStorage.setItem('cart', JSON.stringify(temp));
    } else {
      localStorage.setItem('cart', JSON.stringify([product]));
    }
    alert('Successfully Added to Cart')
  }

}
