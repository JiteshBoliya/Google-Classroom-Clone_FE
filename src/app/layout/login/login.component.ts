import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: any
  name!: any
  loading:boolean
  constructor(private signinservice: GoogleGapiService, 
              private ref: ChangeDetectorRef, 
              private router: Router, 
              private authservice: AuthService, 
              private authguard: AuthGuard) { }

  ngOnInit(): void { 
    if (this.authguard.canActivate() == true) this.router.navigate(['/home'])
    this.loading=false
  }
  signIn() {
    this.loading=true
    this.signinservice.signin().then((res) => {
      this.authservice.userLogin(res).subscribe(
        res => {
          this.authservice.updateUser(res.user)
          this.authservice.userId=res.user
          localStorage.setItem('userid', res.user._id)
          localStorage.setItem('userData', res.user.token)
          this.router.navigate(['/home'])
        })
    })
  }
}
