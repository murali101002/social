import { AuthInterceptor } from "./components/auth/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing/app-routing.module";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./components/posts/post-create/post-create.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import { PostListComponent } from "./components/posts/post-list/post-list.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SingnUpComponent } from "./components/auth/singn-up/singn-up.component";
import { ErrorInterceptor } from "./error.interceptor";
import { ErrorDialogComponent } from "./components/error/error-dialog/error-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SingnUpComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    // Angular provided HTTP_INTERCEPTORS let angular know to add custom interceptor using useClass
    // If there are multiple interceptors, angular will add another instead of overriding current one
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  // this property is used to load components which were unreachable through route or selector
  entryComponents: [ErrorDialogComponent]
})
export class AppModule {}
