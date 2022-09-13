import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { CartCustomerComponent } from './components/cart-area/cart-customer/cart-customer.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { CartAdminComponent } from './components/cart-area/cart-admin/cart-admin.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { CartItemComponent } from './components/cart-area/cart-item/cart-item.component';
import { LoggedOutLayoutComponent } from './components/layout-area/logged-out-layout/logged-out-layout.component';
import { AboutComponent } from './components/auth-area/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotifierModule } from 'angular-notifier';
import { LoggedInLayoutComponent } from './components/layout-area/logged-in-layout/logged-in-layout.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { SearchMainComponent } from './components/search-area/search-main/search-main.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductCardAdminComponent } from './components/products-area/product-card-admin/product-card-admin.component';
import { StoreModule } from '@ngrx/store';
import { productsInCartReducer } from './state/productsInCart/productsInCart.reducer';
import { productsReducer } from './state/products/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsInCartEffects } from './state/productsInCart/productsInCart.effects';
import { ProductsEffects } from './state/products/products.effects';
import { OrderDetailsComponent } from './components/order-area/order-details/order-details.component';
import { OrderCartComponent } from './components/order-area/order-cart/order-cart.component';
import { OrderLayoutComponent } from './components/order-area/order-layout/order-layout.component';


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
        LoggedOutLayoutComponent,
        AboutComponent,
        LoggedInLayoutComponent,
        ProductCardComponent,
        SearchMainComponent,
        ProductCardAdminComponent,
        OrderDetailsComponent,
        OrderCartComponent,
        OrderLayoutComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        Ng2SearchPipeModule,
        StoreModule.forRoot({ productsInCart: productsInCartReducer, products: productsReducer }),
        EffectsModule.forRoot([ProductsInCartEffects, ProductsEffects]),
        NotifierModule.withConfig({
            position: {
                horizontal: {
                    position: 'right',
                    distance: 12,
                },
                vertical: {
                    position: 'bottom',
                    distance: 12,
                    gap: 10,
                },
            },
            theme: 'material',
            behaviour: {
                autoHide: 3000,
                onClick: false,
                onMouseover: 'pauseAutoHide',
                showDismissButton: false,
                stacking: 4,
            },
            animations: {
                enabled: true,
                show: {
                    preset: 'slide',
                    speed: 300,
                    easing: 'ease',
                },
                hide: {
                    preset: 'fade',
                    speed: 300,
                    easing: 'ease',
                    offset: 50,
                },
                shift: {
                    speed: 300,
                    easing: 'ease',
                },
                overlap: 150,
            },
        }),

    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
