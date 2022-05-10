import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css']
})
export class MarksComponent implements OnInit {
  userDetail: any;
  assignments: any;
  classId: any;
  userAssignment: any;
  AssignmentArraysize:Number
  marks:[any][any];
  gotMarks:any
  isloaded: boolean=false;

  constructor(private streampost:StreamsrvService,
    private activeRoute:ActivatedRoute,
    private assign:AssignsrvService,) { }
  ngOnInit(): void {

    // setInterval(() => {
    //   this.isloaded=true 
    // }, 2000);
    
    this.classId=this.activeRoute.snapshot.paramMap.get('id')

    this.streampost.getUserlist(this.classId).subscribe(res=>{
      this.userDetail=res
      this.isloaded=true
    })
    
    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res       
    })
    
    this.assign.getAllUserAssignment(this.classId).subscribe(res=>{
      this.userAssignment=res
    })
    
  }
  getMarks(userid:any,assignId:any){
  let marks=[...this.userAssignment].find((el:any)=>{
     if(el.owner===userid && el.assignment._id===assignId) return el.marks
    })
    return marks?marks.marks:0
  }
}
