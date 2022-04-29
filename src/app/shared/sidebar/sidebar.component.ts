import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
              private router: Router) { }

  ngOnInit(): void {

    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })

    this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
      this.joinclasses=res
    })

  }


  openNav() {

    console.log("hey");
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  closeNav() {
    
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

}
