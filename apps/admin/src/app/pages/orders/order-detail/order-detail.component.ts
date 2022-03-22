import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mnplus/orders';
import { ORDER_STATUS } from '../order.constants';
@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit {
  order!: Order | any;
  orderStatus = [] as any;
  // ORDER_STATUS

  constructor(
    private ordSrv: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus()
  }

  private _mapOrderStatus()
  {
    this.orderStatus = Object.keys(ORDER_STATUS).map(key => {
      console.log(ORDER_STATUS[key]);
      return {
        id: key,
        name: ORDER_STATUS[key].label
      }
    });
    console.log(Object.keys(ORDER_STATUS));
  }

  private _getOrder()
  {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ordSrv.getOrder(params['id']).subscribe(order => {
          this.order = order;
        });
      }
    })
  }

}
