import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  _id: any;
  product: Product = new Product();

  constructor(private _route: ActivatedRoute,
    private _httpClient: HttpClient,
    private _router: Router) { }

  ngOnInit(): void {

    this._id = this._route.snapshot.paramMap.get('_id');
    this._httpClient.get<Product>('http://localhost:8080/admin/products/' + this._id).subscribe(result => {
      console.log("getProductByIdResponse = " + JSON.stringify(result));
      this.product = result;
    }, error => {
      console.log(error);
    })
    
  }
  updateProduct() {
    if (!this.isValidDiscountPrice(this.product.discountPrice, this.product.price)) {
      alert("Enter a valid discount price. Discount price cannot be greater than actual price");
      return;
    }

    if (!this.isPriceDefined(this.product.discountPrice)){
      this.product.discountPrice = this.product.price;
    }
    console.log("updateProduct = " + JSON.stringify(this.product));
    this._httpClient.post('http://localhost:8080/admin/products/edit/' + this._id, this.product).subscribe(result => {
      alert('Product Updated Successfully.');
      this._router.navigate(['/products']);
    }, (error) => {
      console.log(error);
    })
  }

  isValidDiscountPrice(discount: number, actual: number){
    if (!this.isPriceDefined(discount)) {
         return true;
       }
    return ((discount<actual)&&discount>=0);
  }

  isPriceDefined(p: number) {
    return p!=null&&p!=undefined&&((""+p).trim().length!=0);
  }
}
