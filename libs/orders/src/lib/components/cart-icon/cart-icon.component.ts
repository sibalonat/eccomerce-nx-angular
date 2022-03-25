import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount?: any = 0;
  constructor(
    private cartSrv: CartService
  ) { }

  ngOnInit(): void {
    this.cartCount = this.cartSrv.getCart().items?.length;
    console.log(this.cartCount);
  }

}
