import { Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { ClasssrvService } from '../../shared/service/classsrv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  classes: any
  user!: any
  public classForm !: FormGroup;
  constructor(private classsub: ClasssrvService, 
              private formBuilder: FormBuilder, 
              private router: Router,
              private auth: AuthService,
              private authguard:AuthGuard) { 
              }

  ngOnInit(): void {

    // #Get and Validate Rectiveform data
    this.classForm = new FormGroup({
      name: new FormControl("", Validators.required),
      subject: new FormControl("", Validators.required),
    })

    if(this.auth.usersubject==null){
      this.auth.getUser(localStorage.getItem('userid')).subscribe(res=>{
        this.auth.updateUser(res)
      })
    }
    else{
      this.auth.usersubject.subscribe(res=>{
        this.user=res
      })
    }
    
    
    // #Get userdetail
    // this.auth.getUser(localStorage.getItem('userData'))
    // .subscribe(res=>{
    //   this.user=res
    //   this.classsub.getClass(res)
    //   .subscribe((data) => {
    //     this.classes = data
    //     // console.log("data",data);
    //   })
    // })

    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })

    // #AuthGuard
    if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
  }
  
  // #Add Class
  addClass() {
    const formData = new FormData()
    formData.append('name', this.classForm.get('name')?.value)
    formData.append('subject', this.classForm.get('subject')?.value)
    // console.log(this.user);
    this.classsub.addClass({name:formData.get('name'),subject:formData.get('subject'),owner:this.user._id}).subscribe(
      res => {
        // console.log(res);
        
        // this.classsub.class=res
        // this.classsub.classchanged.next(this.classsub.class)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '[ '+this.classForm.get('name')?.value+' ] Class created',
          showConfirmButton: false,
          timer: 1500
        })
        // Swal.fire("Created", this.classForm.get('name')?.value, "success");
        this.classForm.reset()
      }
    )
    // window.location.reload();
  } 
}
