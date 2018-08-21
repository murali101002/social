import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "./components/error/error-dialog/error-dialog.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  errorMessage = 'An unknown error occured';
  constructor(public dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.error.message) {
          this.errorMessage = error.error.message;
        }
        this.dialog.open(ErrorDialogComponent, {data: {message: this.errorMessage}});
        return throwError(error);
      })
    );
  }
}
