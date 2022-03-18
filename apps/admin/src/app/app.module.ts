import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesService } from '@mnplus/products';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
// AdminDashboardComponent
// import { AdminDashboardComponent } from './admin-dashboard/pages/admin-dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule
];

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
