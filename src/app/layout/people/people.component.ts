import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamsrvService } from 'src/app/shared/service/streamsrv.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  classDetail: any;
  userDetail:any;

  constructor(private streampost:StreamsrvService,
    private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {

  this.streampost.getClassDetail(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    console.log(res);
    this.classDetail=res
  })

  this.streampost.getUserlist(this.activeRoute.snapshot.paramMap.get('id')).subscribe(res=>{
    console.log(res);
    this.userDetail=res})
  }
}
