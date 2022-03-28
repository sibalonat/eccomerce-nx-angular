import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItem, CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit, OnDestroy {

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;

  // endsubs$: Subject<any> =

  endsubs$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private cartSrv: CartService,
    private ordSrv: OrdersService
    // private prdSrv: ProductsService
  ) { }

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }


  private _getCartDetails()
  {
    this.cartSrv.cart$.pipe(takeUntil(this.endsubs$)).subscribe(respCart => {
      this.cartItemsDetailed = [];

      this.cartCount = respCart.items?.length ?? 0;

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

  updateCartItemQuantity(event: any, cartitem: CartItemDetailed)
  {
      this.cartSrv.setCartItem({
        productId: cartitem.product.id,
        quantity: event.value
      }, true);
  }

}
