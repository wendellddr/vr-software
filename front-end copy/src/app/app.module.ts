import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingControl } from './shared/loading/loading.control';
import { LoadingModule } from './shared/loading/loading.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    MatSnackBarModule,
  ],
  providers: [LoadingControl],
  bootstrap: [AppComponent],
})
export class AppModule {}
