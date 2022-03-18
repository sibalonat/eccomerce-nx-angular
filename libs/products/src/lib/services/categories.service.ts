
import { environment } from '../../../../../environments/environment';

import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Http

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  apiURLCategories = environment.apiURL + 'categories';

  constructor(private http: HttpClient) { }

  getCategories() : Observable<Category[]>
  {
    return this.http.get<Category[]>(this.apiURLCategories);
  }
  getCategory(categoryId: string) : Observable<Category>
  {
    return this.http.get<Category>(`${this.apiURLCategories}${categoryId}`);
  }

  createCategory(category: Category): Observable<Category>
  {
    return this.http.post<Category>(this.apiURLCategories, category);
  }

  deleteCategory(categoryId: string): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURLCategories}${categoryId}`);
  }
  updateCategory(category: Category): Observable<Category>
  {
    return this.http.put<Category>(`${this.apiURLCategories}/${category.id}`, category);
    // return this.http.put<Category>(`http://localhost:3000/api/v1/categories/${category.id}`);
  }
}
