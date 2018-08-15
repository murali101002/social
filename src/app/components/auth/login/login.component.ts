import { Subscription } from 'rxjs';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  private authSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
    this.isLoading = true;
    this.authSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isLoading = false;
      if (isAuthenticated) {
      }
    });
  }

}
