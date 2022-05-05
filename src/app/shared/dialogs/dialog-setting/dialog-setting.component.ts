import { Component, OnInit } from '@angular/core';
import {MatSlideToggle} from'@angular/material/slide-toggle'
import { ClasssrvService } from '../../service/classsrv.service';
@Component({
  selector: 'app-dialog-setting',
  templateUrl: './dialog-setting.component.html',
  styleUrls: ['./dialog-setting.component.css']
})
export class DialogSettingComponent implements OnInit {
  modal:any
  image: any;
  text: any;
  classes: any;
  constructor(private classsub: ClasssrvService,) { }

  ngOnInit(): void {
    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })
  }
  uploadFileEvt(imgFile: any) {
    this.text=imgFile.target.files[0].name
    this.image=imgFile.target.files[0]
  }

}
