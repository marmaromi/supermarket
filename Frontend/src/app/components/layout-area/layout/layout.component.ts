import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public loggedIn: boolean;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.isLoggedIn();
        const loginSub = this.authService.loginStatus$.subscribe(loginStatus => this.loggedIn = loginStatus);
        this.sub.add(loginSub);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
