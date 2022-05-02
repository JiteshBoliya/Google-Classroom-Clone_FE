import { Component, OnInit } from '@angular/core';
import {MatSlideToggle} from'@angular/material/slide-toggle'
@Component({
  selector: 'app-dialog-setting',
  templateUrl: './dialog-setting.component.html',
  styleUrls: ['./dialog-setting.component.css']
})
export class DialogSettingComponent implements OnInit {
  modal:any
  image: any;
  text: any;
  constructor() { }

  ngOnInit(): void {
  }
  uploadFileEvt(imgFile: any) {
    this.text=imgFile.target.files[0].name
    this.image=imgFile.target.files[0]
  }

}
