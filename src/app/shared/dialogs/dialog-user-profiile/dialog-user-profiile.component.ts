import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AssignsrvService } from '../../service/assignment.service';

@Component({
  selector: 'app-dialog-user-profiile',
  templateUrl: './dialog-user-profiile.component.html',
  styleUrls: ['./dialog-user-profiile.component.css']
})
export class DialogUserProfiileComponent implements OnInit {
  public commentForm!:FormGroup
  userDetail:any
  panelOpenState = false;
  publicComment:any
  privateComment:any
  public MarksForm !: FormGroup;
  constructor(private assign:AssignsrvService,
    private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {    
    this.assign.getuserAssignmentDetail(this.assign.assignId,this.assign.userId).subscribe(res=>{
      this.userDetail=res
      this.userDetail= Object.assign({},...this.userDetail)
    })
    this.MarksForm = new FormGroup({
      marks: new FormControl("", Validators.required),
    })

  }
  submitdata(){
    const value = this.MarksForm.value
    let formData= new FormData()
    formData.append('marks', value['marks'])
    formData.append('assignment',this.userDetail.assignment._id)
    formData.append('owner',this.userDetail.owner._id)
    this.assign.updateMarks(formData)
        .subscribe((res)=>{
          console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Marks updated', 
        showConfirmButton: false,
        timer: 1500
      })
      window.close()
    })
  }
}
