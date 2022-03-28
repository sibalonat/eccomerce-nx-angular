import { Order } from './../models/order';

import { environment } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  apiURLOrders = environment.apiURL + 'orders';
  
  apiURLProducts = environment.apiURL + 'products';

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

  updateOrder(orderStatus: {status: string}, orderId: string): Observable<Order>
  {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStatus);
  }

  getOrdersCount(): Observable<number>
  {
    return this.http
    .get<number>(`${this.apiURLOrders}/get/count`)
    .pipe(map((objectValue: any) => objectValue.totalsales));
  }

  getTotalSales(): Observable<number> {
    return this.http
    .get<number>(`${this.apiURLOrders}/get/totalsales`)
    .pipe(map((objectValue: any) => objectValue.totalsales))
  }

  getProduct(productId: string) : Observable<any>
  {
    return this.http.get<any>(`${this.apiURLProducts}/${productId}`);
  }
}
