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

  constructor(private streampost:StreamsrvService,
    private activeRoute:ActivatedRoute,
    private assign:AssignsrvService,) { }
  ngOnInit(): void {
    this.classId=this.activeRoute.snapshot.paramMap.get('id')

    this.streampost.getUserlist(this.classId).subscribe(res=>{
      // console.log(res);
      this.userDetail=res
    })
    
    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res      
      // console.log(res)
      this.AssignmentArraysize= [...this.assignments].length
      console.log(this.AssignmentArraysize);
      
    })
    // console.log("hey");
    
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
