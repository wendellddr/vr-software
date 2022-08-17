import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { LoadingControl } from '../shared/loading/loading.control';

@NgModule({ providers: [CommonModule] })
export class CoreModule {
  constructor() {}

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
          deps: [MatSnackBar, LoadingControl],
        },
      ],
    };
  }
}
