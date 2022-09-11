import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-logged-in-layout',
    templateUrl: './logged-in-layout.component.html',
    styleUrls: ['./logged-in-layout.component.css']
})
export class LoggedInLayoutComponent implements OnInit {

    public screenWidth: any;
    public mainPanel = 'col main';
    public cartPanel = 'col collapse cart';
    public userRole: string;
    public userId: string;

    constructor(private authService: AuthService, private cartService: CartService, private notify: NotifyService) { }

    async ngOnInit(): Promise<void> {
        try {
            this.screenWidth = window.innerWidth;
            const user = this.authService.getUserDetails();
            this.userRole = user.role;

            if (this.userRole !== 'admin') {
                this.userId = user._id;
                await this.cartService.getLatestCartByUser(this.userId);
            }

        } catch (err: any) {
            this.notify.error(err);
        }


    }

    collapseCart() {

        if (this.mainPanel === 'col main') {
            this.mainPanel = 'main';
        }
        else {
            this.mainPanel = 'col main';
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.screenWidth = event.target.innerWidth;
    }

}
