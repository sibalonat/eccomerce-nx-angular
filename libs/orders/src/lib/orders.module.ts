import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';

import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';
import { ChecloutPageComponent } from './pages/checlout-page/checlout-page.component';



const routes: Routes = [
  {
    path: 'cart',
    component: CartPageComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    ChecloutPageComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    ChecloutPageComponent
  ]
})

export class OrdersModule {
  constructor (cardService: CartService) {
    cardService.iniCartLocalStorage();
  }
}

