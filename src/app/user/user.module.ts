import { UserRoutingModule } from './../user-routing/user-routing.module';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingnUpComponent } from './../components/auth/singn-up/singn-up.component';
import { LoginComponent } from './../components/auth/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent,
    SingnUpComponent
  ]
})
export class UserModule { }
