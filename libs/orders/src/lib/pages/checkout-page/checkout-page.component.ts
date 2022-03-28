// import { CartService } from './../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as countriesLib from "i18n-iso-countries";
import { Location } from '@angular/common';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';
import { ORDER_STATUS } from "../../order.constants";

declare let require: any;

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {
  isSubmitted = false;
  checkoutFormGroup!: FormGroup;
  editMode = false;
  orderItems: OrderItem[] | any = [];
  userId!: string;
  countries = [] as  any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private orderService: OrdersService
  ) { }

  ngOnInit(): void
  {
    this._initUserForm();
    this._getCartItems();
    this._getCountries();
  }

  private _initUserForm()
  {
    this.checkoutFormGroup =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      street: ['', Validators.required],
      appartment: ['', Validators.required],
      zip: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  private _getCartItems()
  {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item => {
      return {
        product: item.productId,
        quantity: item.quantity
      }
    });
    console.log(this.orderItems);
  }

  private _getCountries()
  {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(
      (entry) => {
      return {
        id: entry[0],
        name: entry[1]
      }
    });
    // console.log(this.countries);
  }

  backTocart()
  {
    this.router.navigate(['/cart'])
  }

  // onCancel() {
  //   this.location.back();
  // }

  placeOrder()
  {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.userForm['street'].value,
      shippingAddress2: this.userForm['apartment'].value,
      city: this.userForm['city'].value,
      zip: this.userForm['zip'].value,
      country: this.userForm['country'].value,
      phone: this.userForm['phone'].value,
      status: ORDER_STATUS[],
      // totalPrice: this.userForm['totalPrice'].value,
      // user: this.userId,
      dateOrdered: `${Date.now()}`,
    }

    this.orderService.createOrder(order).subscribe(
      () => {
        // ORDER_STATUS
      }
      );
  }

  get userForm() {
    return this.checkoutFormGroup.controls;
  }


}
