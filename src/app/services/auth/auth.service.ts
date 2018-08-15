import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthData } from "../../components/auth/auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private jwtToken: string;
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  getJwtToken(): string {
    return this.jwtToken;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveAuthDataToLocal(token, expireDuration) {
    localStorage.setItem('token', token.toString());
    localStorage.setItem('expiresIn', expireDuration.toISOString());
  }
  clearLocalAuthData() {
    localStorage.clear();
  }
  authAuthUser() {
    const authInfo = this.getLocalAuthData();
    const now = new Date();
    if (!authInfo) {
      return;
    }
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.jwtToken = authInfo.token;
      this.authStatusListener.next(true);
      this.setAUthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
    }
  }
  private setAUthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  getLocalAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiresIn');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/users/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  logout() {
    this.authStatusListener.next(false);
    this.jwtToken = null;
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
    this.clearLocalAuthData();
    clearTimeout(this.tokenTimer);
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        "http://localhost:3000/api/users/login",
        authData
      )
      .subscribe(result => {
        this.jwtToken = result.token;
        if (this.jwtToken) {
          const now = new Date();
          const expirationDate = new Date(now.getTime() + result.expiresIn * 1000);
          this.saveAuthDataToLocal(result.token, expirationDate);
          this.setAUthTimer(expirationDate);
          this.router.navigate(['/']);
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
        }
      });
  }
}
