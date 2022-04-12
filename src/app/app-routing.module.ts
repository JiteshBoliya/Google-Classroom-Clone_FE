import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './layout/class/class.component';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { StreamComponent } from './layout/stream/stream.component';
import { LoginComponent } from './layout/login/login.component';

const routes: Routes = [  
{ path:'',redirectTo:'/login', pathMatch: 'full'},
{ path: 'login', component: LoginComponent},
{ path: 'home', component: HomepageComponent },
// { path: 'class', component: ClassComponent },
{ path: 'stream', component:StreamComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
