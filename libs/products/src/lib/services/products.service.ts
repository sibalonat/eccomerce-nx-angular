import { Product } from './../models/product';

import { environment } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]>
  {
    return this.http.get<Product[]>(this.apiURLProducts);
  }
  // getCategory(categoryId: string) : Observable<Category>
  // {
  //   return this.http.get<Category>(`${this.apiURLCategories}${categoryId}`);
  // }

  createProduct(productData: FormData): Observable<Product>
  {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  // deleteCategory(categoryId: string): Observable<any>
  // {
  //   return this.http.delete<any>(`${this.apiURLCategories}${categoryId}`);
  // }
  // updateCategory(category: Category): Observable<Category>
  // {
  //   return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
  // }
}
