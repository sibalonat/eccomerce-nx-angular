import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';



import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

// import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';

const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BadgeModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InputTextModule,
    DropdownModule,
    InputMaskModule,
  ],
  providers: [],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
  ]
})

export class OrdersModule {
  constructor (cardService: CartService) {
    cardService.iniCartLocalStorage();
  }
}

