import { Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { ClasssrvService } from '../../shared/service/classsrv.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  classes: any
  user: any
  public classForm !: FormGroup;
  constructor(private classsub: ClasssrvService, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    // this.classForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   subject: ['', Validators.required]
    // })
    this.classForm = new FormGroup({
      name: new FormControl("", Validators.required),
      subject: new FormControl("", Validators.required)
    })
    this.classsub.classes().subscribe((data) => {
      console.log(data);
      this.classes = data;
    })
  }
  toHome() {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
  }
  addClass() {
    const formData = new FormData()
    console.log(this.classForm.get('name')?.value);

    formData.append('name', this.classForm.get('name')?.value)
    formData.append('subject', this.classForm.get('subject')?.value)
    this.classsub.addClass(formData).subscribe(
      res => {
        Swal.fire("Created", this.classForm.get('name')?.value, "success");
        this.classForm.reset()
      }
    )
  }
}
function swal(arg0: { title: string; text: string; imageUrl: string; }) {
  throw new Error('Function not implemented.');
}

