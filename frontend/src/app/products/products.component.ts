import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: any;
  displayList: any;
  isAdmin: Boolean;

  constructor(private _httpClient: HttpClient) {
    this.isAdmin = localStorage.getItem('userAccess') == 'admin' ? true : false;
  }


  ngOnInit(): void {

      this._httpClient.get<any>('http://localhost:8080/products')
      .subscribe(result => {
        this.productList = result["productList"];
        this.displayList = result["productList"];
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
