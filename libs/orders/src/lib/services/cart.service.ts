import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  iniCartLocalStorage()
  {
    const initialCart = {
      items: []
    }

    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem('cart', initialCartJson);
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

    cart.items?.push(cartItem);
    return cart;

  }
}
