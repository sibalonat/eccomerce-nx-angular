
import { Product } from './../../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { CartService, CartItem } from '@mnplus/orders';




@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private catSrv: CartService
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
  }

  addProductToCart()
  {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.catSrv.setCartItem(cartItem);

  }

}
