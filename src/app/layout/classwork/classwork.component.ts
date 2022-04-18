import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DialogAssignmentComponent } from 'src/app/shared/dialogs/dialog-assignment/dialog-assignment.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-classwork',
  templateUrl: './classwork.component.html',
  styleUrls: ['./classwork.component.css']
})
export class ClassworkComponent implements OnInit {
  panelOpenState = false;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {}
  onSubmit(){
    this.dialog.open(DialogAssignmentComponent) 
  }
}