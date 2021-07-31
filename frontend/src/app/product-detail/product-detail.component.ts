import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  _id: any;
  product: Product = new Product();

  constructor(private _httpClient: HttpClient, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.viewProduct();
  }
 
  viewProduct() {
    this._id = this._route.snapshot.paramMap.get('_id');
    console.log(this._id);
    this._httpClient.get<Product>('http://localhost:8080/products/' + this._id).subscribe(result => {
      console.log("response[getProductbyId] = " + JSON.stringify(result));
      this.product = result;
    }, error => {
      console.log("error = " + JSON.stringify(error));
    })
  }

  addtocart() {
    console.log(this.product);
    let cart = localStorage.getItem('cart');
    if (cart) {
      let temp = JSON.parse(cart);
      temp.push(this.product);
      localStorage.setItem('cart', JSON.stringify(temp));
    } else {
      localStorage.setItem('cart', JSON.stringify([this.product]));
    }
    alert('Successfully Added to Cart')
  }

  }
