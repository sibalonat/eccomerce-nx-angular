import { Subject, takeUntil } from 'rxjs';
import { OnDestroy } from '@angular/core';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mnplus/orders';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  endsubs$: Subject<void> = new Subject<void>();
  constructor(
    private ordSrv: OrdersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getOrders()
  {
    this.ordSrv.getOrders().pipe(takeUntil(this.endsubs$)).subscribe(
      orders => {
        this.orders = orders;
      }
    );
  }

  showOrder(orderId: string)
  {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId: string)
  {
    this.ordSrv.deleteOrder(orderId);
  }

}
