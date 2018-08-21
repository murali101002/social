import { PostsModule } from './posts/posts.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthInterceptor } from "./components/auth/auth-interceptor";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing/app-routing.module";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./components/header/header.component";
import { ErrorInterceptor } from "./error.interceptor";
import { ErrorDialogComponent } from "./components/error/error-dialog/error-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    PostsModule
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
