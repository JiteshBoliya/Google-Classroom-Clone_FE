import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/service/auth.service';
import { GoogleGapiService } from '../shared/service/google-gapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: any
  name: any;
  constructor(private signinservice: GoogleGapiService, private ref: ChangeDetectorRef, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.user = this.auth.getToken();
    const userdata = localStorage.getItem('userData')
    if (this.user != userdata || this.user==null ) {
      this.router.navigate(['/login'])
    }
    this.name = localStorage.getItem('name')
  }
  signOut() {
    // this.signinservice.signout().then((res)=>{
    this.user = this.auth.getToken();
    this.auth.logout(this.user)
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])
    // })
    //   this.router.navigate(['/login'])
    // }) 
  }
  sweetAlert() {
    Swal.fire({
      title: 'Are you sure want to Logout ' + this.name + ' ?',
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
  toClass() {
    document.getElementById("class")?.scrollIntoView({ behavior: "smooth" })
  }
}
