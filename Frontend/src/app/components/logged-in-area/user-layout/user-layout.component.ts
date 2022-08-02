import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  public mainCollapse = "col-sm-12 col-md-8 col-lg-9";

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCollapseStatus$.subscribe(collapsedStatus => this.mainCollapse = collapsedStatus)

  }

  isCollapsed() {

    if (this.mainCollapse === "col-sm-12 col-md-8 col-lg-9") {
      this.mainCollapse = "col-sm-12";
    }
    else {
      this.mainCollapse = "col-sm-12 col-md-8 col-lg-9";
    }
    console.log(this.mainCollapse);

  }

}
