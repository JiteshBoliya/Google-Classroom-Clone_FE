import { Component, OnInit } from '@angular/core';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';

@Component({
  selector: 'app-assign-student-work',
  templateUrl: './assign-student-work.component.html',
  styleUrls: ['./assign-student-work.component.css']
})
export class AssignStudentWorkComponent implements OnInit {
  assignId: any;
  assignment: Object;

  constructor(private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.assign.get_SpecificAssignment(this.assignId).subscribe(res=>{
      this.assignment=res
      console.log(res);
  })
  
  }

}
