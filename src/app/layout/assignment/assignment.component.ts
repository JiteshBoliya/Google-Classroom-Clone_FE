import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  assignId:any
  assignment:any
  statusAssign:any
  isCreator: boolean;
  constructor(private assign:AssignsrvService,
    private classsub:ClasssrvService) { }

  ngOnInit(): void {
    this.assignId=this.assign.assignId
    this.isCreator=this.classsub.isCreator
    
  }
}
