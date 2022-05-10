import { Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { ClasssrvService } from '../../shared/service/classsrv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DialogTodoComponent } from 'src/app/shared/dialogs/dialog-todo/dialog-todo.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettingComponent } from 'src/app/shared/dialogs/dialog-setting/dialog-setting.component';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';
import { WebDataService } from 'src/app/shared/service/web-data.service';
// import { join } from 'path';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  classes: any
  user!: any
  public classForm !: FormGroup;
  public joinClassForm !: FormGroup;
  joinclasses: any;
  currentUser: string;
  creator: any;
  isloaded: boolean=false;
  constructor(private classsub: ClasssrvService, 
              private formBuilder: FormBuilder,
              private streampost:StreamsrvService, 
              private router: Router,
              private auth: AuthService,
              private authguard:AuthGuard,
              private dialog:MatDialog,
              private activeRoute:ActivatedRoute,
              private webdata:WebDataService) { 
              }

  ngOnInit(): void {

    setInterval(() => {
      this.isloaded=true 
    }, 1000);
    

    this.webdata.classSubject.subscribe(res=>{
      console.log(res);
    })

    // #Get and Validate Rectiveform data
    this.classForm = new FormGroup({
      name: new FormControl("", Validators.required),
      subject: new FormControl("", Validators.required),
    })

    this.joinClassForm = new FormGroup({
      classcode: new FormControl("", Validators.required)
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

    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })

    this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
      this.joinclasses=res
    })
    // #AuthGuard
    if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
  }
  
  // #Add Class
  addClass() {
    const formData = new FormData()
    formData.append('name', this.classForm.get('name')?.value)
    formData.append('subject', this.classForm.get('subject')?.value)
    this.classsub.addClass({name:formData.get('name'),subject:formData.get('subject'),owner:this.user._id}).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '[ '+this.classForm.get('name')?.value+' ] Class created',
          showConfirmButton: false,
          timer: 1500
        })
        this.webdata.classSubject.subscribe(res=>{
          console.log(res);
        })
        this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
          this.classes=res
        })
        this.classForm.reset()
      }
    )
  } 
  joinClass(){
    this.classsub.CheckCode(this.joinClassForm.get('classcode')?.value).subscribe(
      res => {
        console.log("res:"+res);
        if(res!==null){
        this.classsub.joinClass({class:res,user:localStorage.getItem('userid')}).subscribe(res=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Class Enrolled',
            showConfirmButton: false,
            timer: 1500
          })
          this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
            this.joinclasses=res
          })
        })
        }
        else{
          Swal.fire({
            position: 'center',
            icon:'error',
            title: 'Wrong code',
            showConfirmButton: false,
            timer: 1500
          })
        }
        this.joinClassForm.reset()
      }
    )
  }

  onTodo(){
    this.dialog.open(DialogTodoComponent) 
  }
  onsetting(){
    this.dialog.open(DialogSettingComponent) 
  }
}