import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { getIndex } from '@syncfusion/ej2-angular-richtexteditor';
import { DialogUserProfiileComponent } from 'src/app/shared/dialogs/dialog-user-profiile/dialog-user-profiile.component';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assign-student-work',
  templateUrl: './assign-student-work.component.html',
  styleUrls: ['./assign-student-work.component.css']
})
export class AssignStudentWorkComponent implements OnInit {
  public commentForm!:FormGroup
  assignId: any;
  assignment: Object;
  userDetail: any;
  classid:any;
  userlist:any
  userId:any
  statusAssign: any;
  statAssign:number;
  statHandedIn:number;
  selectStatus:any
  data:any
  privateComment: any;
  isCreator: any;
  isloaded: boolean=false;
  owner: any;

  constructor(private dialog:MatDialog,
              private assign:AssignsrvService,
              private streampost:StreamsrvService,
              private activeRoute:ActivatedRoute,
              private classsub:ClasssrvService) { }

  ngOnInit(): void {

    // setInterval(() => {
    //   this.isloaded=true 
    // }, 2000);
    
    this.assign.assignId=this.activeRoute.snapshot.paramMap.get('id')
    this.owner = localStorage.getItem('userid')
    this.assign.get_classDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.userlist=res 
    this.isloaded=true
    this.isCreator=this.classsub.isCreator
    
  })
  this.commentForm = new FormGroup({
    comment: new FormControl("")
  })
  // this.OnRefreshData()
  }
  onSelect(option:any){
    this.selectStatus=option.value  
  }
  onSubmit(userid:any){
    this.assign.userId=userid
    this.dialog.open(DialogUserProfiileComponent) 
  }
  onChat(userid:any){
    this.assign.getPrivateComment(this.activeRoute.snapshot.paramMap.get('id'),true,userid).subscribe(res=>{
      this.privateComment=res
    })
  }
  OnRefreshData(){
  this.assign.get_countStatus('Assigned',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.statAssign=res.data
  })
  this.assign.get_countStatus('missing',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.statAssign=+res.data
  })
  this.assign.get_countStatus('handed In',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.statHandedIn=res.data
  })
  this.assign.get_countStatus('Done late',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.statHandedIn=+res.data
  })  
  }
  addPrivateComment(){
    let formData = new FormData() 
    formData.append('comment',this.commentForm.get('comment')?.value)
    formData.append('owner', this.owner)
    formData.append('assignmentId', this.activeRoute.snapshot.paramMap.get('id'))
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

