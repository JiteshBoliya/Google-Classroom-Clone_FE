import { Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../google-gapi.service';
import { ClasssrvService } from '../service/classsrv.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  classes: any;
  constructor(private classsub: ClasssrvService, private auth: GoogleGapiService) {
    // if (this.auth.getuserdetail() == null) {
    //   console.log("not");
    // }else{
    //   console.log("yes");
    // }
      this.classsub.classes().subscribe((data) => {
        console.log(data);
        this.classes = data;
      })
  }
  
  ngOnInit(): void {
  }
  toHome(){
    document.getElementById("home")?.scrollIntoView({behavior:"smooth"})
  }
}
