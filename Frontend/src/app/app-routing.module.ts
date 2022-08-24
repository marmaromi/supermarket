import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoggedOutLayoutComponent } from "./components/layout-area/logged-out-layout/logged-out-layout.component";
import { LoggedInLayoutComponent } from "./components//layout-area/logged-in-layout/logged-in-layout.component";
import { PageNotFoundComponent } from "./components/layout-area/page-not-found/page-not-found.component";
import { LoginGuard } from "./guards/login.guard";
import { LogoutGuard } from "./guards/logout.guard";

const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: LoggedInLayoutComponent, canActivate: [LoginGuard] },
    { path: "login", component: LoggedOutLayoutComponent, canActivate: [LogoutGuard] },
    { path: "register", component: LoggedOutLayoutComponent, canActivate: [LogoutGuard] },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
