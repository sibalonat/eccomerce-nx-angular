import { Cart } from './../models/cart';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart';
import { BehaviorSubject, Subject } from 'rxjs';

export const CART_KEY = "cart";

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // cart$: Subject<Cart> = new Subject();
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
    } else {
      this.cart$.next(cart);
    }
  }

  emptyCart()
  {
    const initialCart = {
      items: []
    }

    const initialCartJson = JSON.stringify(initialCart);
    localStorage.setItem(CART_KEY, initialCartJson);
    this.cart$.next(initialCart);

    // localStorage
  }

  getCart() : Cart {
    const cartJSonString: string = localStorage.getItem(CART_KEY) || '{}';
    const cart: Cart = JSON.parse(cartJSonString);
    return cart;
    // const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY) || '{}');
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();

    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

    if (cartItemExist) {
      cart.items?.map((item) => {
        if (item.productId === cartItem.productId && typeof item != "undefined") {
          if (updateCartItem) {
            item.quantity = cartItem.quantity!;
          } else {
            item.quantity = item.quantity! + cartItem.quantity!;
          }
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
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();

    const newCart = cart.items?.filter(item => item.productId !== productId);

    cart.items = newCart;

    const cartUpdatedJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartUpdatedJson);

    this.cart$.next(cart);
  }
}
