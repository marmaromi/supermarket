import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsModel } from '../models/credentials-model';
import { UserModel } from '../models/user-model';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token: string = null;
  public user: UserModel = null;

  constructor(private http: HttpClient, private notifyService: NotifyService) {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.user = (jwtDecode(this.token) as any).user;
    }
  }

  public async login(credentials: CredentialsModel): Promise<void> {
    try {
      const token = await firstValueFrom(this.http.post<string>(environment.authUrl + "login", credentials));
      localStorage.setItem("token", token);

    } catch (error: any) {
      this.notifyService.error(error)
    }
  }

  public async register(user: UserModel): Promise<void> {
    await firstValueFrom(this.http.post<string>(environment.authUrl + "register", user));

    const credentials = new CredentialsModel(user.username, user.password);
    await this.login(credentials);
  }

  public logout(): void {
    localStorage.removeItem("token");
  }

  public isLoggedIn(): boolean {
    if (this.user) {
      return true;
    }
    else {
      return false;
    }
  }

  public getUserDetails(): UserModel {
    if (this.user) {
      return this.user;
    }
    else {
      console.log("No user is logged in");
      return null;

    }
  }


}
