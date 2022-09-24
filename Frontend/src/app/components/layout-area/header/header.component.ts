import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public loggedIn: boolean;
    public user: UserModel;

    constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }

    ngOnInit(): void {
        const loginSub = this.authService.loginStatus$.subscribe(loginStatus => this.loggedIn = loginStatus);
        this.sub.add(loginSub);
        const userSub = this.authService.userDetails$.subscribe(user => this.user = user);
        this.sub.add(userSub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public logout() {    
        this.authService.logout();
        this.authService.isLoggedIn();
        this.notify.success('התנתקות בוצעה בהצלחה');
        this.router.navigateByUrl('/login');
    }

}
