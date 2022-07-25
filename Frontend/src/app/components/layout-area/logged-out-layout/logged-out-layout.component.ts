import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-out-layout',
  templateUrl: './logged-out-layout.component.html',
  styleUrls: ['./logged-out-layout.component.css']
})
export class LoggedOutLayoutComponent implements OnInit {

  public loggedIn: boolean;
  public url: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.router.navigateByUrl("/home");
    }

    if (this.router.url === '/login') {
      this.url = "login"
    }

    if (this.router.url === '/register') {
      this.url = "register"
    }    

  }

}
