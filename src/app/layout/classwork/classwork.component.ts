import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { DialogAssignmentComponent } from 'src/app/shared/dialogs/dialog-assignment/dialog-assignment.component';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
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
  assignments: any
  currentUser: any;
  creator: any;
  statAssign: number;
  statHandedIn: number;
  isCreator: boolean;
  isloaded: boolean = false;
  constructor(private dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    private assign: AssignsrvService,
    private streampost: StreamsrvService,
    private classsub: ClasssrvService,) { }

  ngOnInit(): void {

    // setInterval(() => {
    //   this.isloaded = true
    // }, 2000);


    this.classId = this.activeRoute.snapshot.paramMap.get('id')
    this.assign.classId = this.classId

    this.assign.getAssignment(this.classId).subscribe(res => {
      this.assignments = res
      this.isloaded=true
    })
    this.isCreator = this.classsub.isCreator

    // #Get userid permission to user
    this.currentUser = localStorage.getItem('userid')
    this.streampost.getClassCreator(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.creator = res
      this.creator = Object.assign({}, ...this.creator)
    })
  }
  onSubmit() {
    this.dialog.open(DialogAssignmentComponent).afterClosed().subscribe(res => {
      this.assign.getAssignment(this.classId).subscribe(res => {
        this.assignments = res
      })
    })

  }
}