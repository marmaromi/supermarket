import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: "",
      password: ""
    })

    this.loginForm.valueChanges.subscribe(console.log);

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public async login() {
    try {
      const fromValue = this.loginForm.value;
      // console.log(fromValue);
      await this.authService.login(fromValue)
      console.log("logged in successfully");
      this.router.navigateByUrl('/home');

    } catch (err: any) {
      console.log(err);

    }
  }

}
