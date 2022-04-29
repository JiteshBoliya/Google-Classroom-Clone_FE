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

  constructor(private classsub: ClasssrvService,private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.assign.getAllAssinment().subscribe(res=>{
      this.assignments=res      
      // console.log(res);
    })
    this.classsub.classlist(localStorage.getItem('userid')).subscribe(res=>{
      this.joinclasses=res
    })
  }

}
