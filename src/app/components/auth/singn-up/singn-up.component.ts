import { Subscription } from "rxjs";
import { AuthService } from "./../../../services/auth/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";


@Component({
  selector: "app-singn-up",
  templateUrl: "./singn-up.component.html",
  styleUrls: ["./singn-up.component.css"]
})
export class SingnUpComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
    this.authSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isLoading = false;
        if (isAuthenticated) {
        }
      });
  }
  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }
}
