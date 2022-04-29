import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  assignId:any
  assignment:any
  statusAssign:any
  constructor(private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.assignId=this.assign.assignId
  }
}
