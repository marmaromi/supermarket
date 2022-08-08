import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.authService.userDetails$.subscribe(user => this.userRole = user.role);
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
