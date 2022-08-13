import { Component, HostListener, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
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
  public mainPanel = "col-xs-12 col-md-8 col-lg-9 main";
  public cartPanel = "col-xs-12 col-md-4 col-lg-3 collapse cart"
  public userRole: string;
  public userId: string;

  constructor(private authService: AuthService, private cartService: CartService, private notify: NotifyService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.screenWidth = window.innerWidth;
      const user: UserModel = await firstValueFrom(this.authService.userDetails$)
      this.userRole = user.role;
      this.userId = user._id;
      
      // this.authService.userDetails$.subscribe(user => {
        //   this.userRole = user.role;
        //   this.userId = user._id;
        // });
        
        await this.cartService.getCartWithProducts(this.userId);


    } catch (err: any) {
      this.notify.error(err);
    }
  }

  collapseCart() {

    if (this.mainPanel === "col-xs-12 col-md-8 col-lg-9 main") {
      this.mainPanel = "main";
    }
    else {
      this.mainPanel = "col-xs-12 col-md-8 col-lg-9 main";
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
  }

}
