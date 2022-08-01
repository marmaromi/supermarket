import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-in-main',
  templateUrl: './logged-in-main.component.html',
  styleUrls: ['./logged-in-main.component.css']
})
export class LoggedInMainComponent implements OnInit {

  public role: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
  }

}
