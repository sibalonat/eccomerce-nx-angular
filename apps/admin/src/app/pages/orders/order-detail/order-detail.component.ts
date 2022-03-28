import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order, OrdersService } from '@mnplus/orders';
import { ORDER_STATUS } from '../../../../../../../libs/orders/src/lib/order.constants';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [
  ]
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order!: Order | any;
  orderStatus = [] as any;
  selectedStatus: any;
  endSubs$: Subject<void> = new Subject<void>();
  // ORDER_STATUS

  constructor(
    private ordSrv: OrdersService,
    private route: ActivatedRoute,
    private msgSrv: MessageService
  ) { }

  ngOnInit(): void {
    this._getOrder();
    this._mapOrderStatus()
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
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
  }

  onStatusChange(event: Event | null | any)
  {
    this.ordSrv.updateOrder({status: event.value}, this.order.id).pipe(takeUntil(this.endSubs$)).subscribe(
      () => {
      this.msgSrv.add({
        severity: 'success',
        summary: 'Success',
        detail: `Status for the order ${this.order['name']}`
      }),
      () => {
        this.msgSrv.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order could not update'
        })
      }
    });
  }

  private _getOrder()
  {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ordSrv.getOrder(params['id']).pipe(takeUntil(this.endSubs$)).subscribe(order => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    })
  }

}
