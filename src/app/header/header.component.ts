import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GoogleGapiService } from '../google-gapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: gapi.auth2.GoogleUser
  name:any;
  constructor(private signinservice: GoogleGapiService,private ref:ChangeDetectorRef)
  {
    this.name=null;
  } 
  ngOnInit(): void {
    // this.signinservice.observable( ).subscribe(users =>{
    //   this.user=users
    //   this.ref.detectChanges();
    // })  
    // throw new Error('Method not implemented.');
  }
  signIn(){
    this.signinservice.signin().then((res)=>{
      this.name = res
    })
  }
  signOut(){this.signinservice.signout().then((res)=>{
    this.name=res
  }) 
}
sweetAlert() {
  Swal.fire({
    title: 'Are you sure want to Logout '+this.name+' ?',
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Logout',
    cancelButtonText: 'Cancel'
  }).then((response: any) => {
    if (response.value) {
      Swal.fire(
        'Logout',
        'Logout successfully',
        'success'
      )
      this.signOut()
    } else if (response.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Back to work',
        'error'
      )
    }
  })
}
toClass(){
  document.getElementById("class")?.scrollIntoView({behavior:"smooth"})
}
}
