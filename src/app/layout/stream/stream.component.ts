import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,Form } from '@angular/forms';
import { Params, Router ,ActivatedRoute} from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
import Swal from 'sweetalert2';
import {StreamsrvService} from '../../shared/service/streamsrv.service'
@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  posts: any
  user!: any
  uname:any
  classId:any
  classDetail:any
  public postForm !: FormGroup;
  currentUser: any;
  creator: any;
  isCreator: boolean;


  constructor(private streampost:StreamsrvService,
    private classsub: ClasssrvService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService,
    private authguard:AuthGuard,
    private activeRoute:ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    // #Get and Validate Rectiveform data
    this.postForm = new FormGroup({
      text: new FormControl("", Validators.required),
    })

    this.classId=this.activeRoute.snapshot.paramMap.get('id')
    this.streampost.getPost(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.posts=res
    }) 
    this.auth.usersubject.subscribe(res=>{
      this.user=res
    })

    // #Get userid permission to user
    this.currentUser=localStorage.getItem('userid')
    this.streampost.getClassCreator(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.creator=res
    this.creator=Object.assign({},...this.creator)
    if(this.currentUser==this.creator.owner) this.classsub.isCreator=true
    else this.classsub.isCreator=false
    this.isCreator=this.classsub.isCreator
    
  })
  
    if(this.uname==null){
      this.auth.getUser(localStorage.getItem('userid')).subscribe(res=>{
        this.auth.updateUser(res)
      })
    }

    this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.classDetail=res
    })

    if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
  }
  
  // #Add post
  addPost() {
    const formData = new FormData()
    formData.append('text', this.postForm.get('text')?.value)
    this.streampost.addpost({text:formData.get('text'),owner:this.user._id,classsub:this.classId}).subscribe(
      res => {
        Swal.fire("Post uploaded","", "success");
        this.postForm.reset()
      }
    )
  }
}
