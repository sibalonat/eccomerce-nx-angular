import { HttpClientModule } from '@angular/common/http';
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

import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule
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
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
