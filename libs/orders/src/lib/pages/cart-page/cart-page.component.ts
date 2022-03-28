import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItem, CartItemDetailed } from '../../models/cart';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit {

  cartItemsDetailed: CartItemDetailed[] = [];

  constructor(
    private router: Router,
    private cartSrv: CartService,
    private ordSrv: OrdersService
    // private prdSrv: ProductsService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  private _getCartDetails()
  {
    this.cartSrv.cart$.pipe().subscribe(respCart => {
      respCart.items?.forEach((cartItem) => {
        // console.log(cartItem);
        this.ordSrv.getProduct(cartItem.productId!).subscribe((resProduct) => {
          // console.log(products);
          this.cartItemsDetailed.push({
            product: resProduct,
            quantity: cartItem.quantity
          })
        })
      });
    })
  }


  backToShop()
  {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartitem: CartItemDetailed): void
  {
    this.cartSrv.deleteCartItem(cartitem.product?.id)
  }

}
