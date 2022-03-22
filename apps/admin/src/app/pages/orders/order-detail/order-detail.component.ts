import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@mnplus/orders';

@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit {
  order!: Order | any;

  constructor(
    private ordSrv: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._getOrder();
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
