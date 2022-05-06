import { Component, OnInit } from '@angular/core';
import {MatSlideToggle} from'@angular/material/slide-toggle'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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
  constructor(private classsub: ClasssrvService,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.classsub.getClass(localStorage.getItem('userid')).subscribe(res=>{
      this.classes=res
    })
  }
  uploadFileEvt(imgFile: any) {
    this.text=imgFile.target.files[0].name
    this.image=imgFile.target.files[0]

    const formData = new FormData()
  formData.append('files',this.image)
  this.classsub.updateUserImg(localStorage.getItem('userid'),formData).subscribe(res=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Class image updated', 
      showConfirmButton: false,
      timer: 1500
    })
  })
  }
}
