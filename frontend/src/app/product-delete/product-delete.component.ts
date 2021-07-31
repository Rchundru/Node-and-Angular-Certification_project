import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  _id: any;
  product: Product = new Product();

  constructor(private _httpClient: HttpClient, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._id = this._route.snapshot.paramMap.get('_id');
    console.log("delete ProductId=" + this._id);
    this._httpClient.post('http://localhost:8080/admin/products/delete', {"id" : this._id})
      .subscribe(result => {
        console.log("response[deleteProductbyId] = " + JSON.stringify(result));
        this._router.navigate(['/products']);
      }, error => {
        console.log("error = " + JSON.stringify(error));
      })
  }

}
