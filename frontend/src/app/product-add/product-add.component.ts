import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = new Product();

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  addProduct() {
    if (!this.isValidDiscountPrice(this.product.discountPrice, this.product.price)) {
      alert("Enter a valid discount price.Discount price cannot be greater than actual price");
      return;
    }
    if (!this.isPriceDefined(this.product.discountPrice)){
      this.product.discountPrice = this.product.price;
    }
    console.log("addProduct" + JSON.stringify(this.product));
    this._httpClient.post('http://localhost:8080/admin/products/save', this.product).subscribe(result => {
      alert('Product Added Successfully.');
      this._router.navigate(['/products']);
    }, (error) => {
      console.log(error);
    })
  }

  isValidDiscountPrice(discount: any, actual: any){
    if (!this.isPriceDefined(discount)) {
         return true;
       }
    return ((discount<actual)&&discount>=0);
  }

  isPriceDefined(p: any) {
    return p!=null&&p!=undefined&&((""+p).trim().length!=0);
  }

}
