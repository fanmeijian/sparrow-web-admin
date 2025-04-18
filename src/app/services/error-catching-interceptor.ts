import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoadingDialogService } from './loading-dialog.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private loadingDialogService: LoadingDialogService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingDialogService.hideDialog();
      })
    );
  }
}
