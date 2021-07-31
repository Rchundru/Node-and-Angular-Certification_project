import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {

  this._httpClient.get<any>('http://localhost:8080/products')
    .subscribe(result => {
      this.products = result["productList"];
    }, error => {
      console.log((error)); 
    })

  }

}
