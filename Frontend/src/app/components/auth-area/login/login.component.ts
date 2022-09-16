import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notify: NotifyService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: '',
            password: ''
        });

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
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    public async login() {
        try {
            const fromValue = this.loginForm.value;
            await this.authService.login(fromValue);
            this.authService.isLoggedIn();
            this.notify.success('התחברת בהצלחה');

            this.router.navigateByUrl('/home');

        } catch (err: any) {
            this.notify.error(err);

        }
    }

    public successMessage() {

    }

}
