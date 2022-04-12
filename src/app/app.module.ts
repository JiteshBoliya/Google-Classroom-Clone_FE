import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassComponent } from './layout/class/class.component';
import { HeaderComponent } from './header/header.component';
import { StreamComponent } from './layout/stream/stream.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassworkComponent } from './layout/classwork/classwork.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorServiceService } from './shared/service/auth-interceptor.service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ClassComponent,
    HeaderComponent,
    StreamComponent,
    ClassworkComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
