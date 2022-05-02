import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { StreamComponent } from './layout/stream/stream.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassworkComponent } from './layout/classwork/classwork.component';
import { LoginComponent } from './layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorServiceService } from './shared/service/auth-interceptor.service.service';
import { StreamNevComponent } from './layout/post/stream-nev.component';
import { PeopleComponent } from './layout/people/people.component';
import { MarksComponent } from './layout/marks/marks.component';
import { AssignmentComponent } from './layout/assignment/assignment.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion'
import { DialogAssignmentComponent } from './shared/dialogs/dialog-assignment/dialog-assignment.component';
import { AssignmentNavComponent } from './layout/assign-instruction/assignment-inst.component';
import { AssignStudentWorkComponent } from './layout/assign-student-work/assign-student-work.component';
import { DialogTodoComponent } from './shared/dialogs/dialog-todo/dialog-todo.component';
import { MatSelectModule } from '@angular/material/select';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DialogSettingComponent } from './shared/dialogs/dialog-setting/dialog-setting.component';
// import {MatSlideToggle} from'@angular/material/slide-toggle';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgToggleModule } from 'ng-toggle-button';
import { NgxEditorModule } from 'ngx-editor';
import { DialogUserProfiileComponent } from './shared/dialogs/dialog-user-profiile/dialog-user-profiile.component';
import { DialogEmailComponent } from './shared/dialogs/dialog-email/dialog-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    StreamComponent,
    ClassworkComponent,
    LoginComponent,
    StreamNevComponent,
    PeopleComponent,
    MarksComponent,
    AssignmentComponent,
    DialogAssignmentComponent,
    AssignmentNavComponent,
    AssignStudentWorkComponent,
    DialogTodoComponent,
    SidebarComponent,
    DialogSettingComponent,
    DialogUserProfiileComponent,
    DialogEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    // MatSlideToggle
    RichTextEditorModule,
    NgToggleModule,
    NgxEditorModule
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
// https://www.youtube.com/watch?v=ZL0d3M3uoRQ 