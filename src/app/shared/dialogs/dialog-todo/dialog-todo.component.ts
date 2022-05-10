import { Component, OnInit } from '@angular/core';
import { AssignsrvService } from '../../service/assignment.service';
import { ClasssrvService } from '../../service/classsrv.service';

@Component({
  selector: 'app-dialog-todo',
  templateUrl: './dialog-todo.component.html',
  styleUrls: ['./dialog-todo.component.css']
})
export class DialogTodoComponent implements OnInit {
  assignments: any;
  joinclasses: any;
  selectedDevice:any

  constructor(private classsub: ClasssrvService,private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
      this.joinclasses=res
    })
    // this.classsub.get_todo(localStorage.getItem('userid')).subscribe(res=>{
    //   this.assignments=res
    // })
    this.classsub.get_todo_classwise(localStorage.getItem('userid'),'*').subscribe(res=>{
      this.assignments=res
    })
  }
  onClassChange(classid:any){
    this.classsub.get_todo_classwise(localStorage.getItem('userid'),classid.target.value).subscribe(res=>{
      this.assignments=res
    })
  }
  onStatusChange(status:any){
    this.classsub.get_todo_statuswise(localStorage.getItem('userid'),status.target.value).subscribe(res=>{
      this.assignments=res
    console.log(this.assignments);
    
    })
  }
}
