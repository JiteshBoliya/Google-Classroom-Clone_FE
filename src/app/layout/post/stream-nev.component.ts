import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
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
export class StreamNevComponent implements OnInit,OnDestroy {

  editor: Editor;
  html: '';
  posts: any
  i:number
  comment:any
  user!: any
  uname:any
  postId:any
  classId:any
  classDetail:any
  currentUser:any
  text:any
  stringToHTML:any
  panelOpenState = false;
  public commentForm !: FormGroup;
  public postForm !: FormGroup;
  creator: any;
  assignments:any
  constructor(private streampost:StreamsrvService,
    private classsub: ClasssrvService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService,
    private authguard:AuthGuard,
    private activeRoute:ActivatedRoute,
    private assign:AssignsrvService,) { }

  ngOnInit(): void {

    this.classId=this.activeRoute.snapshot.paramMap.get('id')
    this.assign.classId=this.classId

    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res      
      console.log(res);
    }) 

    this.editor = new Editor();
  
  // Get post form data
  this.postForm = new FormGroup({text: new FormControl("", Validators.required)})


  // Get comment form data
  this.commentForm = new FormGroup({
    comment: new FormControl("", Validators.required),
    postId:new FormControl("")})

  // Get post by classid
  this.classId=this.activeRoute.snapshot.paramMap.get('id')
  this.streampost.getPost(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.posts=res

  }) 
  
  
    // Get comment by postid
    // this.postId=this.activeRoute.snapshot.paramMap.get('pid')
    // console.log(postId);
    
    this.streampost.getComment(this.activeRoute.snapshot.paramMap.get('pid')).subscribe(res=>{
      // console.log("comment:",res);
      this.comment=res
    }) 

  // use the user subject
  this.auth.usersubject.subscribe(res=>{this.user=res})

  // Get user detail from database
  if(this.uname==null){
    this.auth.getUser(localStorage.getItem('userid')).subscribe(res=>{this.auth.updateUser(res)})
  }

  // #Get userid permission to user
  this.currentUser=localStorage.getItem('userid')
  this.streampost.getClassCreator(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.creator=res
  })
    
  
  // Get Class Details
  this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{this.classDetail=res})

  // Authguard
  if (this.authguard.canActivate() == false) this.router.navigate(['/login'])
}
ngOnDestroy(): void {
  this.editor.destroy();  
}

// #Add post
addPost() {
  const formData = new FormData()
  formData.append('text', this.postForm.get('text')?.value)
  this.streampost.addpost({text:formData.get('text'),owner:this.user._id,classsub:this.classId}).subscribe(
    res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Post Uploaded',
        showConfirmButton: false,
        timer: 1500
      })
      this.postForm.reset()
    }
  )
  console.log(this.text);
  
}

// #Add Comment
addComment(id:any){
  const formData = new FormData()
  formData.append('comment', this.commentForm.get('comment')?.value)
  // formData.append('postId', this.commentForm.get('postId')?.value)
  // formData.append('postId', this.commentForm.get('postId')?.value)
  
  this.streampost.addComment({comment:formData.get('comment'),owner:this.user._id,postId:id}).subscribe(
    res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comment Posted', 
        showConfirmButton: false,
        timer: 1500
      })
      this.commentForm.reset()
    }
  )
}

}
 
