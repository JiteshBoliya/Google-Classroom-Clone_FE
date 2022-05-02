import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignsrvService } from '../../service/assignment.service';

@Component({
  selector: 'app-dialog-user-profiile',
  templateUrl: './dialog-user-profiile.component.html',
  styleUrls: ['./dialog-user-profiile.component.css']
})
export class DialogUserProfiileComponent implements OnInit {
  userDetail:any
  constructor(private assign:AssignsrvService,
    private activeRoute:ActivatedRoute,

    ) { }

  ngOnInit(): void {    
    this.assign.getuserAssignmentDetail(this.assign.assignId,this.assign.userId).subscribe(res=>{
      console.log(res);
      this.userDetail=res
    })

  }

}
