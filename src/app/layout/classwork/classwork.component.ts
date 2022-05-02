import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { DialogAssignmentComponent } from 'src/app/shared/dialogs/dialog-assignment/dialog-assignment.component';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-classwork',
  templateUrl: './classwork.component.html',
  styleUrls: ['./classwork.component.css']
})
export class ClassworkComponent implements OnInit {
  panelOpenState = false;
  classId: any;
  assignments:any
  currentUser: any;
  creator: any;
  statAssign: number;
  statHandedIn: number;
  constructor(private dialog:MatDialog,
              private activeRoute:ActivatedRoute,
              private assign:AssignsrvService,
              private streampost:StreamsrvService) { }

  ngOnInit(): void {

    this.classId=this.activeRoute.snapshot.paramMap.get('id')
    this.assign.classId=this.classId

    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res      
    
      
      // this.assign.get_countStatus('missing',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      //   this.statAssign=+res.data
      // })
      // this.assign.get_countStatus('handed In',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      //   this.statHandedIn=res.data
      // })
      // this.assign.get_countStatus('Done late',this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
      //   this.statHandedIn=+res.data
      // })

    }) 
    
  // #Get userid permission to user
  this.currentUser=localStorage.getItem('userid')
  this.streampost.getClassCreator(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    this.creator=res
  })
  }
  onSubmit(){
    this.dialog.open(DialogAssignmentComponent) 
  }
  // getstatHandedIn(id:any){
  //     this.assign.get_countStatus('Assigned',id).subscribe(res=>{
  //         console.log("hey"+res.data);
  //     })
  // }
}