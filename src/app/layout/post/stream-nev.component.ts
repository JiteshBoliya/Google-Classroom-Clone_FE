import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { User } from 'src/app/shared/models/user.model';
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

  isCreator:boolean=false;
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
  image: any;
  userDetail: any;
  isloaded: boolean=false;
  constructor(private streampost:StreamsrvService,
    private classsub: ClasssrvService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private auth: AuthService,
    private authguard:AuthGuard,
    private activeRoute:ActivatedRoute,
    private assign:AssignsrvService) { }
  ngOnInit(): void {

    // setInterval(() => {
    //   this.isloaded=true 
    // }, 2000);


    //Get upcomming assignment list
    this.classId=this.activeRoute.snapshot.paramMap.get('id')
    this.assign.classId=this.classId
    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res      
    }) 
    
    //Get user Image
    this.classsub.getUserImg(localStorage.getItem('userid')).subscribe(res=>{
      this.userDetail=res
    })

    this.editor = new Editor();
  
  // Set post form data
  this.postForm = new FormGroup({text: new FormControl("", Validators.required)})


  // Set comment form data
  this.commentForm = new FormGroup({
    comment: new FormControl("", Validators.required),
    postId:new FormControl("")
  })

    // Get post by class id
    this.streampost.getPost(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{this.posts=res}) 
    
    // Get comment by post id
    this.streampost.getComment(this.activeRoute.snapshot.paramMap.get('pid')).subscribe(res=>{this.comment=res}) 

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
    this.creator=Object.assign({},...this.creator)
    if(this.currentUser==this.creator.owner) this.classsub.isCreator=true
    else this.classsub.isCreator=false
    this.isCreator=this.classsub.isCreator
  })
    
  
  // Get Class Details
  this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.classDetail=res
    this.classDetail=Object.assign({},...this.classDetail)
    this.isloaded=true
    console.log(this.classDetail);
  })

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

    // Get post by class id
    this.streampost.getPost(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{this.posts=res}) 
      this.postForm.reset()
    }
  )
  console.log(this.text);
  
}

// #Add Comment
addComment(id:any){
  const formData = new FormData()
  formData.append('comment', this.commentForm.get('comment')?.value)
  
  this.streampost.addComment({comment:formData.get('comment'),owner:this.user._id,postId:id}).subscribe(
    res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Comment Posted', 
        showConfirmButton: false,
        timer: 1500
      })
    // Get comment by post id
    this.streampost.getComment(this.activeRoute.snapshot.paramMap.get('pid')).subscribe(res=>{this.comment=res})
      this.commentForm.reset()
    }
  )
}
uploadFileEvt(imgFile: any) {
  this.activeRoute.snapshot.paramMap.get('id')
  this.image=imgFile.target.files[0]
  
  const formData = new FormData()
  formData.append('files',this.image)
  this.classsub.updateImg(this.activeRoute.snapshot.paramMap.get('id'),formData).subscribe(res=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Class image updated', 
      showConfirmButton: false,
      timer: 1500
    })
    this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.classDetail=res
      this.classDetail=Object.assign({},...this.classDetail)
      console.log(this.classDetail);
    })  
  })
}
}
 
