import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { StreamComponent } from './layout/stream/stream.component';
import { LoginComponent } from './layout/login/login.component';
import { ClassworkComponent } from './layout/classwork/classwork.component';
import { StreamNevComponent } from './layout/post/stream-nev.component';
import { PeopleComponent } from './layout/people/people.component';
import { MarksComponent } from './layout/marks/marks.component';
import { AssignmentComponent } from './layout/assignment/assignment.component';
import { AssignmentNavComponent } from './layout/assign-instruction/assignment-inst.component';
import { AssignStudentWorkComponent } from './layout/assign-student-work/assign-student-work.component';

const routes: Routes = [  
{ path:'',redirectTo:'/login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent},
{ path: 'home', component: HomepageComponent },
{ path: 'stream/:id', component:StreamComponent},
{ path: 'stream/post/:id', component:StreamNevComponent},
{ path: 'classwork/:id', component: ClassworkComponent },
{ path: 'people/:id', component: PeopleComponent },
{ path: 'marks/:id', component: MarksComponent },
{ path: 'assignment/:id', component: AssignmentComponent },
{ path: 'Instruction/:id', component: AssignmentNavComponent },
{ path: 'studentWork/:id', component: AssignStudentWorkComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
