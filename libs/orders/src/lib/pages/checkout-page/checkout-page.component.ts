import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CartService } from '@mnplus/orders';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as countriesLib from "i18n-iso-countries";
import { Location } from '@angular/common';
import { OrderItem } from '../../models/order-item';

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
  orderItems: OrderItem[] = [];
  uerId!: string;
  countries = [] as  any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void
  {
    this._initUserForm();
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
    console.log(this.countries);
  }

  backTocart()
  {
    this.router.navigate(['/cart'])
  }

  onCancel() {
    this.location.back();
  }

  get userForm() {
    return this.checkoutFormGroup.controls;
  }


}
