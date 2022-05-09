import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthGuard } from '../shared/service/auth.guard';
import { AuthService } from '../shared/service/auth.service';
import { GoogleGapiService } from '../shared/service/google-gapi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: any
  uname: any
  userDetail:any
  constructor(private signinservice: GoogleGapiService, 
              private ref: ChangeDetectorRef, 
              private router: Router, 
              private auth: AuthService,
              private authguard:AuthGuard) { }
  ngOnInit(): void {

      // #Get user name
      this.auth.usersubject.subscribe(res=>{
        if(res==null){
          this.auth.getUser(localStorage.getItem('userid')).subscribe(res=>{
            this.auth.updateUser(res)
          })
        }
        this.uname=res?res.name:''
      })
    // #Auto logout
    if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
  }

  // #Logout the user-Delete token
  signOut() {
    this.auth.logout(this.user)
    localStorage.removeItem('userid');
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])
  }

  // #SweetAlert for Logout
  sweetAlert() {
    Swal.fire({
      title: 'Are you sure want to Logout ' + this.uname + ' ?',
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

  // #Scroll Effect
  toHome() {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("homenev").classList.add("active")
    document.getElementById("classnev").classList.remove("active")
  }
  // #Scroll to class container
  toClass() {
    document.getElementById("class")?.scrollIntoView({ behavior: "smooth" })
    document.getElementById("classnev").classList.add("active")
    document.getElementById("homenev").classList.remove("active")
  }
}

