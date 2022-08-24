import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserModel } from "src/app/models/user-model";
import { AuthService } from "src/app/services/auth.service";
import { NotifyService } from "src/app/services/notify.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

    public loggedIn: boolean;
    public user: UserModel;

    constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }

    ngOnInit(): void {
        this.authService.loginStatus$.subscribe(loginStatus => this.loggedIn = loginStatus);
        this.authService.userDetails$.subscribe(user => this.user = user);
    }

    public logout() {    
        this.authService.logout();
        this.authService.isLoggedIn();
        this.notify.success("התנתקות בוצעה בהצלחה");
        this.router.navigateByUrl("/login");
    }

}
