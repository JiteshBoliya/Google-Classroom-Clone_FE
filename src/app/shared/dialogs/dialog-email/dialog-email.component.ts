import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AssignsrvService } from '../../service/assignment.service';

@Component({
  selector: 'app-dialog-email',
  templateUrl: './dialog-email.component.html',
  styleUrls: ['./dialog-email.component.css']
})
export class DialogEmailComponent implements OnInit {

  mail?:any
  public EmailForm !: FormGroup;
  constructor(private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.mail=this.assign.usermail
    this.EmailForm = new FormGroup({
      ownerEmail: new FormControl("", Validators.required),
      userEmail: new FormControl(this.assign.usermail, Validators.required),
      password: new FormControl("", Validators.required),
      subject: new FormControl("", Validators.required),
      bodyText: new FormControl("", Validators.required)    
    })
  }
  submitdata(){
    const value = this.EmailForm.value
    console.log(value)
    let formData= new FormData()
    formData.append('ownerEmail', value['ownerEmail'])
    formData.append('userEmail', value['userEmail'])
    formData.append('password', value['password'])
    formData.append('subject', value['subject'])
    formData.append('bodyText', value['bodyText'])
    
    this.assign.sendMail(formData)
        .subscribe((res)=>{
          console.log(res)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Email sent', 
        showConfirmButton: false,
        timer: 1500
      })
      this.EmailForm.reset()
      window.close()
    })
  }
}

