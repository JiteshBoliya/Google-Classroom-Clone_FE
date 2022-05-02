import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
      // console.log(this.AssignmentArraysize);
      
    })
    // console.log("hey");
    
    this.assign.getAllUserAssignment(this.classId).subscribe(res=>{
      this.userAssignment=res
      let k=0
      // console.log("done");
      
      // for(let i=0,j;i<this.AssignmentArraysize;i++){
      //   for(let j=i;j<[...this.userAssignment].length;j++)
      //   {  // this.marks[i][j]=
      //     console.log(this.userAssignment[k++]);
      //     console.log("ok done");
      //     console.log(this.userAssignment);
      //     console.log("aaa");
      //   } 
      // }
      // console.log(this.marks);
      // console.log("hellow");
      
      // this.marks=[this.userAssignment.marks]
      // this.marks=this.AssignmentArraysize
      
      // console.log(typeof(this.marks));
      // console.log(this.marks);
      
      
      // while(this.userAssignment.length){this.marks.push(this.assignments.splice(0,this.AssignmentArraysize));
      //   console.log(this.marks);
        
      
      //   console.log("marks:",this.userAssignment);

      // } 
      // this.marks=[...this.userAssignment]
      
    })
    // this.i=0;console.log(this.i);
    
  }
  // getIndex(j:any):number{
  //   console.log(this.i);
  //   // if(this.i>100) this.i=0
  //   return this.i+=j;
  // }

}
