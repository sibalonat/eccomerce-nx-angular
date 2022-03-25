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
    const cart: Cart = this.getCart();

    if (!cart) {
      const initialCart = {
        items: []
      }

      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem('cart', initialCartJson);
    }
  }

  getCart() : Cart {
    const cartJSonString: string = localStorage.getItem(CART_KEY) || '{}';
    const cart: Cart = JSON.parse(cartJSonString);
    return cart;
    // const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();

    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId && typeof item != "undefined") {
          item.quantity = item.quantity! + cartItem.quantity!;
          return item;
        } else {
          return;
        }
      })
    } else {
      cart.items?.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    return cart;
  }
}
