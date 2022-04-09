import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StreamComponent } from './stream/stream.component';

const routes: Routes = [  
// { path:'',redirectTo:'/home', pathMatch: 'full'},
{ path: 'home', component: HomepageComponent },
// { path: 'class', component: ClassComponent },
{ path: 'stream', component:StreamComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
