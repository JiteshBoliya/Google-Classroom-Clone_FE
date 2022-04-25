import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { AssignsrvService } from '../../service/assignment.service';

@Component({
  selector: 'app-dialog-todo',
  templateUrl: './dialog-todo.component.html',
  styleUrls: ['./dialog-todo.component.css']
})
export class DialogTodoComponent implements OnInit {
  assignments: any;

  constructor(private assign:AssignsrvService) { }

  ngOnInit(): void {
    this.assign.getAllAssinment().subscribe(res=>{
      this.assignments=res      
      console.log(res);
    })
  }

}
