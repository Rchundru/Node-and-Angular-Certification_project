import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  empty: boolean = true;
  total: any = 0;

  constructor() { }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');

    if (cart) {
      this.empty = false;
      this.products = JSON.parse(cart);
      for (let product of this.products) {
        this.total += product.discountPrice;
      }
    }
  }

  remove(product: any) {
    let cart = localStorage.getItem('cart');
    if (cart) {
      let temp = JSON.parse(cart);
      temp.splice(temp.indexOf(product), 1);
      this.products.splice(this.products.indexOf(product), 1);
      localStorage.setItem('cart', JSON.stringify(temp));
    }
  }
}
