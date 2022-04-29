import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AssignsrvService } from 'src/app/shared/service/assignment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-nav',
  templateUrl: './assignment-inst.component.html',
  styleUrls: ['./assignment-inst.component.css']
})
export class AssignmentNavComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public assignmentForm !: FormGroup;

  assignment?: any;
  showFiller = false;
  text: any;
  image: any;
  owner: any;
  assignId: any
  time: any
  status: any
  assignmentUploaded: boolean
  duedate: any;


  constructor(private assign: AssignsrvService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status = "Assigned"

    this.assignmentUploaded = false
    this.assign.assignId = this.activeRoute.snapshot.paramMap.get('id')
    this.assign.get_SpecificAssignment(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.assignment = res
      this.owner = this.assignment[0].owner._id
      this.assignId = this.assignment[0]._id
      this.time = this.assignment[0].time
      this.duedate = this.assignment[0].duedate
      // console.log(this.time);

      if (new Date() > new Date(this.duedate)) this.status = "missing"

      this.assign.addUserAssignment({ owner: this.owner, assignment: this.assignId }).subscribe(res => {
        if ([...res.result.file].length > 0) {
          this.status = res.result.status
          this.text = res.result.file[0].originalname
          this.assignmentUploaded = true
        }
      })
    })
    this.assignmentForm = new FormGroup({
      file: new FormControl("", Validators.required)
    })
  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name
    this.image = imgFile.target.files[0]
  }
  submitAssignment() {
    let formData = new FormData()
    formData.append('file', this.image)
    formData.append('owner', this.owner)
    formData.append('assignment', this.assignId)
    formData.append('time', this.time)
    formData.append('duedate', this.duedate)

    this.assign.addUserAssignment(formData)
      .subscribe((res) => {
        console.log(res);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Assignment Posted ',
          showConfirmButton: false,
          timer: 1500
        }), (err: any) => {
          console.log(err);

        }
        // this.assignmentForm.reset()
      })
  }

}
