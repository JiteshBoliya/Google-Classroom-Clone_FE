import { Component, OnInit } from '@angular/core';
import {StreamsrvService} from './streamsrv.service'

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  posts: any;

  constructor(private pt:StreamsrvService) {
    this.pt.posts().subscribe((data)=>{
      this.posts=data
  })
   }
  ngOnInit(): void {
  }
}
