import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: any
  name:any;
  constructor(private signinservice: GoogleGapiService,private ref:ChangeDetectorRef,private router:Router,private authservice:AuthService) { }

  ngOnInit(): void {
        this.user = this.authservice.getToken();
        const userdata = localStorage.getItem('userData');
        console.log(userdata,"hii",this.user);
        if(this.user==userdata && this.user!=null) this.router.navigate(['/home'])
  }
  signIn(){
    this.signinservice.signin().then((res)=>{
      // this.authservice.userRegister(res).subscribe()
       this.authservice.userLogin(res).subscribe(
        res=>{
          console.log(res)
           localStorage.setItem('userData',res.token);
           console.log("user:",res.user.name);
           localStorage.setItem('name',res.user.name)
           this.router.navigate(['/home'])
        }
      )
      this.name = res
    })
  }
  // signOut(){this.signinservice.signout().then((res)=>{
  //   this.name=res
  // })
// }
}
