import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mnplus/orders';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private ordSrv: OrdersService
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  private _getOrders()
  {
    this.ordSrv.getOrders().subscribe(
      orders => {
        this.orders = orders;
      }
    );
  }

}
