import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoggedInLayoutComponent } from './components/layout-area/logged-in-layout/logged-in-layout.component';
import { LoggedOutLayoutComponent } from './components/layout-area/logged-out-layout/logged-out-layout.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { ProductsListComponent } from './components/products-area/products-list/products-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LoggedInLayoutComponent },
    { path: 'login', component: LoggedOutLayoutComponent },
    { path: 'register', component: LoggedOutLayoutComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
