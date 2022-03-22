/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@mnplus/orders';
import { ORDER_STATUS } from '../order.constants';

// ORDER_STATUS
// ORDER_STATUS
// const ORDER_STATUS: any = {
//   0: {
//     label: 'Pending',
//     color: 'primary'
//   },
//   1: {
//     label: 'Processed',
//     color: 'warning'
//   },
//   2: {
//     label: 'Shipped',
//     color: 'warning'
//   },
//   3: {
//     label: 'Delivered',
//     color: 'success'
//   },
//   4: {
//     label: 'Failed',
//     color: 'danger'
//   }
// };

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordSrv: OrdersService,
    private router: Router
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

  showOrder(orderId: string)
  {
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId: string)
  {
    this.ordSrv.deleteOrder(orderId);
  }

}
