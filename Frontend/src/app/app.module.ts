import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CartCustomerComponent } from './components/cart-area/cart-customer/cart-customer.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { CartAdminComponent } from './components/cart-area/cart-admin/cart-admin.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { CartItemComponent } from './components/cart-area/cart-item/cart-item.component';
import { StoreModule } from '@ngrx/store';
import { LoggedInLayoutComponent } from './components/layout-area/logged-in-layout/logged-in-layout.component';
import { LoggedOutLayoutComponent } from './components/layout-area/logged-out-layout/logged-out-layout.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CartCustomerComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    CartAdminComponent,
    ProductsListComponent,
    HeaderComponent,
    CartItemComponent,
    LoggedInLayoutComponent,
    LoggedOutLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
