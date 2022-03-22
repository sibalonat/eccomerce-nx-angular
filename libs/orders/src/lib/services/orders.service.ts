import { Order } from './../models/order';

import { environment } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  apiURLOrders = environment.apiURL + 'orders';

  constructor(private http: HttpClient) { }

  getOrders() : Observable<Order[]>
  {
    return this.http.get<Order[]>(this.apiURLOrders);
  }
  getOrder(orderId: string) : Observable<Order>
  {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order>
  {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  deleteOrder(orderId: string): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  updateOrder(order: Order): Observable<Order>
  {
    return this.http.put<Order>(`${this.apiURLOrders}/${order.id}`, order);
  }
}
