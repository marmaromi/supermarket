import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart-model';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public loginStatus: boolean = false;
    public cartOpen: boolean = false;
    public cart: CartModel;
    public price: number;
    public user: UserModel = new UserModel();


    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private cartService: CartService,
        private router: Router,
        private notify: NotifyService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: '',
            password: ''
        });

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
            this.loginStatus = this.authService.isLoggedIn();
            await this.getUserCart();
            this.notify.success('התחברת בהצלחה');

        } catch (err: any) {
            this.notify.error(err);

        }
    }

    async getUserCart() {
        this.user = this.authService.getUserDetails();
        this.cart = await this.cartService.getLatestCartByUser(this.user._id);
        this.cartOpen = this.cart.cartOpen ? true : false;
        const productsInCart = await this.cartService.getProductsInCart();
        this.price = productsInCart.reduce((a, b) => a + (b.product.productPrice * b.amount), 0);        
        
    }
}