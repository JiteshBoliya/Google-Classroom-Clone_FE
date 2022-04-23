import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { DialogAssignmentComponent } from 'src/app/shared/dialogs/dialog-assignment/dialog-assignment.component';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
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
  constructor(private dialog:MatDialog,private activeRoute:ActivatedRoute,private assign:AssignsrvService) { }

  ngOnInit(): void {

    this.classId=this.activeRoute.snapshot.paramMap.get('id')
    this.assign.classId=this.classId

    this.assign.getAssignment(this.classId).subscribe(res=>{
      this.assignments=res      
      console.log(res);
      
    }) 
    
  }
  onSubmit(){
    this.dialog.open(DialogAssignmentComponent) 
  }
}