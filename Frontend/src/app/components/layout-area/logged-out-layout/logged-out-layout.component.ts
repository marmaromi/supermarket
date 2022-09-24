import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-logged-out-layout',
    templateUrl: './logged-out-layout.component.html',
    styleUrls: ['./logged-out-layout.component.css']
})
export class LoggedOutLayoutComponent implements OnInit, OnDestroy {

    private sub = new Subscription();
    public loggedIn: boolean;
    public url: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        const loginSub = this.authService.loginStatus$.subscribe(loginStatus => this.loggedIn = loginStatus);
        this.sub.add(loginSub);
        if (this.loggedIn) {
            this.router.navigateByUrl('/home');
        }

        if (this.router.url === '/login') {
            this.url = 'login';
        }

        if (this.router.url === '/register') {
            this.url = 'register';
        }    
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
