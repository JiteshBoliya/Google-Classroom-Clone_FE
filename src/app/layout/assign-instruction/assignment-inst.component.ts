import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-nav',
  templateUrl: './assignment-inst.component.html',
  styleUrls: ['./assignment-inst.component.css']
})
export class AssignmentNavComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public assignmentForm !: FormGroup
  public commentForm!:FormGroup

  assignment?: any;
  showFiller = false;
  text: any;
  image: any;
  owner: any;
  assignId: any
  time: any
  status: any
  assignmentUploaded: boolean
  duedate: any;
  panelOpenState = false;
  comment:any
  i=0;
  privateComment:any
  publicComment:any
  isCreator: boolean;
  userDetail: any;
  isloaded:boolean=false
  
  
  constructor(private assign: AssignsrvService,
    private activeRoute: ActivatedRoute,
    private classsub:ClasssrvService) { }

  ngOnInit(): void {
    this.status = "Assigned"

    //  setInterval(() => {
    //   this.isloaded=true 
    // }, 2000);
    
    this.assignmentUploaded = false
    this.assign.assignId = this.activeRoute.snapshot.paramMap.get('id')
    this.assign.get_SpecificAssignment(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.assignment = res
      this.assignment=Object.assign({},...this.assignment)
      this.owner = localStorage.getItem('userid')
      this.assignId = this.assignment._id
      this.time = this.assignment.time
      this.duedate = this.assignment.duedate

      if (new Date() > new Date(this.duedate)) this.status = "missing"

      this.assign.addUserAssignment({ owner: this.owner, assignment: this.assignId }).subscribe(res => {
        if ([...res.result.file].length > 0) {
          this.status = res.result.status
          this.text = res.result.file[0].originalname
          this.assignmentUploaded = true
        }
      })
    })
    this.assign.getComment(this.activeRoute.snapshot.paramMap.get('id'),true).subscribe(res=>{
      this.privateComment=res
    })    
    
    this.assign.getComment(this.activeRoute.snapshot.paramMap.get('id'),false).subscribe(res=>{
      this.publicComment=res
    })    

    this.assignmentForm = new FormGroup({
      file: new FormControl("", Validators.required)
    })
    this.commentForm = new FormGroup({
      comment: new FormControl("")
    })
    this.classsub.getUserImg(localStorage.getItem('userid')).subscribe(res=>{
      this.userDetail=res
      this.isloaded=true
    })

    this.isCreator=this.classsub.isCreator
    

  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name
    this.image = imgFile.target.files[0]
  }
  submitAssignment() {
    let formData = new FormData()
    formData.append('file', this.image)
    formData.append('owner', this.owner)
    formData.append('assignment', this.assignId)
    formData.append('time', this.time)
    formData.append('duedate', this.duedate)

    this.assign.addUserAssignment(formData)
      .subscribe((res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Assignment Posted ',
          showConfirmButton: false,
          timer: 1500
        }), (err: any) => {
          console.log(err);

        }
        this.assign.addUserAssignment({ owner: this.owner, assignment: this.assignId }).subscribe(res => {
          if ([...res.result.file].length > 0) {
            this.status = res.result.status
            this.text = res.result.file[0].originalname
            this.assignmentUploaded = true
          }
        })  
      })
  }
  addPublicComment(){
    let formData = new FormData() 
    formData.append('comment',this.commentForm.get('comment')?.value)
    formData.append('owner', this.owner)
    formData.append('assignmentId', this.assignId)

    this.assign.addAssignmentComment(formData)
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comment Posted ',
          showConfirmButton: false,
          timer: 1500
        }), (err: any) => {
          console.log(err);
        }
        
      this.assign.getComment(this.activeRoute.snapshot.paramMap.get('id'),false).subscribe(res=>{
        this.publicComment=res
      })   
    })
  }
  addPrivateComment(){
    let formData = new FormData() 
    formData.append('comment',this.commentForm.get('comment')?.value)
    formData.append('owner', this.owner)
    formData.append('assignmentId', this.assignId)
    formData.append('private','true')

    this.assign.addAssignmentComment(formData)
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Comment Posted ',
          showConfirmButton: false,
          timer: 1500
        }), (err: any) => {
          console.log(err);
        }
        this.assign.getComment(this.activeRoute.snapshot.paramMap.get('id'),true).subscribe(res=>{
          this.privateComment=res
        })
      })
  }

}
