import { User } from './../models/user';

import { environment } from '../../../../../environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UsersService {

  apiURLUsers = environment.apiURL + 'users';

  constructor(private http: HttpClient) { }

  getUsers() : Observable<User[]>
  {
    return this.http.get<User[]>(this.apiURLUsers);
  }
  getUser(userId: string) : Observable<User>
  {
    return this.http.get<User>(`${this.apiURLUsers}${userId}`);
  }

  createUser(user: User): Observable<User>
  {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  deleteUser(userId: string): Observable<any>
  {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

  updateUser(user: User): Observable<User>
  {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }
}
