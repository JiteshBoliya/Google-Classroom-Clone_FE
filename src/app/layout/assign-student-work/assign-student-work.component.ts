import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getIndex } from '@syncfusion/ej2-angular-richtexteditor';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';

@Component({
  selector: 'app-assign-student-work',
  templateUrl: './assign-student-work.component.html',
  styleUrls: ['./assign-student-work.component.css']
})
export class AssignStudentWorkComponent implements OnInit {
  assignId: any;
  assignment: Object;
  userDetail: any;
  classid:any;
  userlist:any
  statusAssign: any;
  statAssign:number;
  statHandedIn:number;
  selectStatus:any
  data:any

  constructor(private assign:AssignsrvService,
              private streampost:StreamsrvService,
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.statAssign=0
    this.assign.get_classDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.userlist=res
  })

  this.assign.get_countStatus('Assigned',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.statAssign=res.data
  })
  this.assign.get_countStatus('handed In',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.statHandedIn=res.data
  })
  this.assign.get_countStatus('Done late',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.statHandedIn=+res.data
  })
  }
  onSelect(option:any){
    this.selectStatus=option.value
  }

}
