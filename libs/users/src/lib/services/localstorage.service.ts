import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  // constructor() { }

  setItem(data: any)
  {
    localStorage.setItem(TOKEN, data);
  }

  getItem() : string | null {
    return localStorage.getItem(TOKEN);
  }

  removeItem() : string | void {
    return localStorage.removeItem(TOKEN);
  }
}
