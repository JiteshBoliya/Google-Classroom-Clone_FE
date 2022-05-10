import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogEmailComponent } from 'src/app/shared/dialogs/dialog-email/dialog-email.component';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import { ClasssrvService } from 'src/app/shared/service/classsrv.service';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  classDetail: any;
  userDetail: any;
  isCreator: any;
  userDetails: any;
  isloaded: boolean=false;

  constructor(private dialog:MatDialog,private streampost: StreamsrvService,
    private activeRoute: ActivatedRoute,private assign:AssignsrvService,
    private classsub: ClasssrvService,) { }

  ngOnInit(): void {

    // setInterval(() => {
    //   this.isloaded=true 
    // }, 2000);

    this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.classDetail = res
      this.classDetail=Object.assign({},...this.classDetail)
    })
    this.isCreator=this.classsub.isCreator
    
    this.classsub.getUserImg(localStorage.getItem('userid')).subscribe(res=>{
      this.userDetails=res
    })

    this.streampost.getUserlist(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      console.log(res);
      this.userDetail = res
      this.isloaded=true
    })
  }
  onDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classsub.delete_classlistUser(true).subscribe(res=>{
          Swal.fire(
            'Deleted!',
            'Person removed from class.',
            'success'
          )
        })
      }
    })
  }
  onEmail(mail:any) {
    this.assign.usermail=mail
    console.log(mail);
    this.dialog.open(DialogEmailComponent)
  }
}
