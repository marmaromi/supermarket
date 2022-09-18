import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials-model';
import { UserModel } from '../models/user-model';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _loginStatusSource = new Subject<boolean>();
    public loginStatus$ = this._loginStatusSource.asObservable();

    private _userDetailsSource = new Subject<UserModel>();
    public userDetails$ = this._userDetailsSource.asObservable();

    constructor(private http: HttpClient, private notify: NotifyService) { }

    public async login(credentials: CredentialsModel): Promise<void> {
        try {
            const token = await firstValueFrom(this.http.post<string>(environment.authUrl + 'login', credentials));
            localStorage.setItem('token', token);

        } catch (error: any) {
            throw error;
        }
    }

    public async register(user: UserModel): Promise<void> {
        try {
            console.log(user);
            
            await firstValueFrom(this.http.post<string>(environment.authUrl + 'register', user));
            const credentials = new CredentialsModel(user.email, user.password);
            await this.login(credentials);
            this.getUserDetails();

        } catch (error: any) {            
            if (error.error === 'UserModel validation failed: email: Invalid email address') {
                throw new Error('כתובת אימייל לא תקינה');
            }

            else {
                throw error;
            }
        }
    }

    public logout(): void {
        localStorage.removeItem('token');
    }

    public isLoggedIn(): boolean {
        if (localStorage.getItem('token')) {
            this._loginStatusSource.next(true);
            this.getUserDetails();
            return true;
        }
        else {
            this._loginStatusSource.next(false);
            return false;
        }
    }

    public getUserDetails(): UserModel {
        const user = (jwtDecode(localStorage.getItem('token')) as any).user;
        if (user) {
            this._userDetailsSource.next(user);
        }
        return user;
    }

    public getUserRole(): string {
        const user: UserModel = (jwtDecode(localStorage.getItem('token')) as any).user;
        if (user) {
            return user.role;
        }
        else {
            return null;
        }
    }


}
