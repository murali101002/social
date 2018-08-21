import { Router } from "@angular/router";
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
  private userId: string;

  constructor(private http: HttpClient, private router: Router) {}

  getJwtToken(): string {
    return this.jwtToken;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveAuthDataToLocal(token, expireDuration, userId) {
    localStorage.setItem("token", token.toString());
    localStorage.setItem("expiresIn", expireDuration.toISOString());
    localStorage.setItem("userId", userId.toString());
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
      this.userId = authInfo.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
    }
  }
  private setAuthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  getLocalAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiresIn");
    this.userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: this.userId
    };
  }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post("http://localhost:3000/api/users/signup", authData)
      .subscribe(
        response => {
          this.router.navigate(['/']);
          console.log(response);
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  logout() {
    this.authStatusListener.next(false);
    this.jwtToken = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.router.navigate(["/login"]);
    this.clearLocalAuthData();
    clearTimeout(this.tokenTimer);
  }

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        "http://localhost:3000/api/users/login",
        authData
      )
      .subscribe(
        result => {
          this.jwtToken = result.token;
          if (this.jwtToken) {
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + result.expiresIn * 1000
            );
            this.userId = result.userId;
            this.saveAuthDataToLocal(result.token, expirationDate, this.userId);
            this.setAuthTimer(expirationDate);
            this.router.navigate(["/"]);
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }
}
