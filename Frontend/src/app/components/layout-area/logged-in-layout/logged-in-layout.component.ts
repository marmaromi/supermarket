import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-logged-in-layout',
  templateUrl: './logged-in-layout.component.html',
  styleUrls: ['./logged-in-layout.component.css']
})
export class LoggedInLayoutComponent implements OnInit {

  public mainCollapse = "col-xs-12 col-md-8 col-lg-9 main";
  public userRole: string;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cartService.cartCollapseStatus$.subscribe(collapsedStatus => this.mainCollapse = collapsedStatus);
    this.authService.userDetails$.subscribe(user => this.userRole = user.role);

  }

  isCollapsed() {

    if (this.mainCollapse === "col-xs-12 col-md-8 col-lg-9 main") {
      this.mainCollapse = "col-xs-12 main";
    }
    else {
      this.mainCollapse = "col-xs-12 col-md-8 col-lg-9 main";
    }
  }

}
