import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';

@Component({
  selector: 'app-assignment-nav',
  templateUrl: './assignment-inst.component.html',
  styleUrls: ['./assignment-inst.component.css']
})
export class AssignmentNavComponent implements OnInit {
  assignment?: any;
  showFiller = false;
  constructor(private assign:AssignsrvService,
              private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.assign.assignId=this.activeRoute.snapshot.paramMap.get('id')
    this.assign.get_SpecificAssignment(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      this.assignment=res
      console.log(res);
    })

  }

}
