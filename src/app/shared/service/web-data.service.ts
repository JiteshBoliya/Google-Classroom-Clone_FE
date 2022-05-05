import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Class } from '../models/class.model'

@Injectable({providedIn: 'root'})
export class WebDataService implements OnInit{
  postUrl="http://localhost:3000/post"
  classUrl="http://localhost:3000/class"
  commentUrl="http://localhost:3000/comment"
  userUrl="http://localhost:3000/user"
  assignmentUrl="http://localhost:3000/assignment"

  userSubject=new BehaviorSubject<User>(null);
  classSubject=new BehaviorSubject<Class>(null);
  commentSubject=new BehaviorSubject<User>(null);
  assignmentSubject=new BehaviorSubject<User>(null);
  postSubject=new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient) { }
  ngOnInit(): void {}
  
  updateUser(data:any){this.userSubject.next(data)}
  updatePost(data:any){this.postSubject.next(data)}
  updateComment(data:any){this.commentSubject.next(data)}
  updateClass(data:any){this.classSubject.next(data)}
  updateAssignment(data:any){this.assignmentSubject.next(data)}
  
  // #Get posts
  // getPost(classId:any){ 
  //   return this.http.get(`${this.postUrl}/get/`+classId).subscribe(res=>{
  //   this.updatePost(res)
  //   this.postSubject.subscribe(res=>{console.log(res)})
  // })}
  
  // #Get class
  getClass(user:any){
    return this.http.get(`${this.classUrl}/get/`+user).subscribe(res=>{
    this.updateClass(res)
    this.classSubject.subscribe(res=>{console.log(res)})
  })}

  // #Get comment
  getComment(postId:any){ return this.http.get(`${this.commentUrl}/get/`+postId)}

  // #Get classlist
  classlist(userid:any){return this.http.get(`${this.classUrl}/classlist/`+userid)}

  // #Get Assignment of class
  getAssignment(classId:any){ return this.http.get(`${this.assignmentUrl}/get/`+classId)}

  // #Get user Assignment
  getUserAssignment(AssignId:any){return this.http.get(`${this.assignmentUrl}/userAssignment/get`,AssignId)}

  // #Get Assignment comment-- private/public
  getAssignComment(AssignId:any,pri:boolean){ return this.http.get(`${this.assignmentUrl}/Comment/`+AssignId+`/`+pri)}

}
