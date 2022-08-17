import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingControl } from '../shared/loading/loading.control';

export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly loadingCtrl: LoadingControl,
  ) {}

  //Intercepta os erros http e mostra em uma snackbar
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `${
            error.error?.message || 'Erro ao processar a requisição.'
          }`;
        } else {
          if (error.error?.message) {
            errorMessage = `${
              Array.isArray(error.error?.message)
                ? JSON.stringify(error.error.message)
                : error.error.message
            }`;
          } else {
            errorMessage = 'Erro ao processar a requisição.';
          }
        }

        this.snackBar.open(errorMessage, 'Fechar', { duration: 3000 });
        this.loadingCtrl.hide();

        return throwError(errorMessage);
      }),
    );
  }
}
