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
import { CartChooseUserComponent } from './components/cart-area/cart-choose-user/cart-choose-user.component';
import { CartAdminComponent } from './components/cart-area/cart-admin/cart-admin.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HeaderComponent } from './components/layout-area/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CartCustomerComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    CartChooseUserComponent,
    CartAdminComponent,
    ProductsListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
