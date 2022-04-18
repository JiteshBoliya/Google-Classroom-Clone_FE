import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stream-nev',
  templateUrl: './stream-nev.component.html',
  styleUrls: ['./stream-nev.component.css']
})
export class StreamNevComponent implements OnInit {
  posts: any
  user!: any
  uname:any
  classId:any
  classDetail:any
  public postForm !: FormGroup;
  constructor(private streampost:StreamsrvService,
    private classsub: ClasssrvService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService,
    private authguard:AuthGuard,
    private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {this.postForm = new FormGroup({
    text: new FormControl("", Validators.required),
  })

  this.classId=this.activeRoute.snapshot.paramMap.get('id')
  this.streampost.getPost(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.posts=res
    console.log(res);
  }) 
  this.auth.usersubject.subscribe(res=>{
    this.user=res
  })

  if(this.uname==null){
    this.auth.getUser(localStorage.getItem('userid')).subscribe(res=>{
      this.auth.updateUser(res)
    })
  }

  this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.classDetail=res
    // console.log(this.classDetail);
  })

  if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
}

// #Add post
addPost() {
  const formData = new FormData()
  formData.append('text', this.postForm.get('text')?.value)
  console.log(this.user);
  // this.posts.
  this.streampost.addpost({text:formData.get('text'),owner:this.user._id,classsub:this.classId}).subscribe(
    res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post Uploaded',
        showConfirmButton: false,
        timer: 1500
      })
      // Swal.fire("Post uploaded","", "success");
      this.postForm.reset()
    }
  )
}

}
