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
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
