import { OrdersService } from './../../services/orders.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'orders-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endsubs$: Subject<void> = new Subject<void>();
  totalPrice!: number;

  constructor(
    private cartService: CartService,
    private ordSrv: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrdersSummary();
  }


  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getOrdersSummary()
  {
    this.cartService.cart$.pipe(takeUntil(this.endsubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.ordSrv
          .getProduct(item.productId!)
          .pipe(take(1))
          .subscribe((product) => {
            this.totalPrice += product.price * item.quantity!;
          });
        });
      }
    });
  }

}
