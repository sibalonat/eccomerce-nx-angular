import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: []
})

export class OrdersModule {
  constructor (cardService: CartService) {
    cardService.iniCartLocalStorage();
  }
}

