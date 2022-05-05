import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogSettingComponent } from '../dialogs/dialog-setting/dialog-setting.component';
import { DialogTodoComponent } from '../dialogs/dialog-todo/dialog-todo.component';
import { ClasssrvService } from '../service/classsrv.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  classes: any;
  joinclasses: any;

  constructor(private classsub: ClasssrvService, 
              private router: Router,
              private dialog:MatDialog) { }

  ngOnInit(): void {

    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })

    this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
      this.joinclasses=res
    })

  }


  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }
  onTodo(){
    this.dialog.open(DialogTodoComponent) 
  }
  onsetting(){
    this.dialog.open(DialogSettingComponent) 
  }

}
