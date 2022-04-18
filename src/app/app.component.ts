import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GoogleGapiService } from './shared/service/google-gapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyClass'
  user!: gapi.auth2.GoogleUser
  name:any;
  constructor(private signinservice: GoogleGapiService,private ref:ChangeDetectorRef)
  {} 
  ngOnInit(): void {
    this.signinservice.observable( ).subscribe(users =>{
      this.user=users
      this.ref.detectChanges();
    })  
    // throw new Error('Method not implemented.');
  }
  
  // signIn(){
  //   this.signinservice.signin().then((res)=>{
  //     this.name = res
  //   })
  // }
  // signOut(){this.signinservice.signout()
  // }
  
}