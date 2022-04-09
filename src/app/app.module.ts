import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClassComponent } from './class/class.component';
import { HeaderComponent } from './header/header.component';
import { StreamComponent } from './stream/stream.component';
import { HttpClientModule } from '@angular/common/http';
import { ClassworkComponent } from './classwork/classwork.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ClassComponent,
    HeaderComponent,
    StreamComponent,
    ClassworkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
