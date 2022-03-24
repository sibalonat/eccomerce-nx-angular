import { ProductsModule } from '@mnplus/products';

import { UiModule } from '@mnplus/ui';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';

import { AccordionModule } from 'primeng/accordion';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductListComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    UiModule,
    ProductsModule,
    AccordionModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
