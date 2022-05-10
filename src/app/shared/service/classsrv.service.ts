import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable, catchError, Subject, BehaviorSubject } from 'rxjs';
import { Class } from '../models/class.model';
@Injectable({providedIn: 'root'})
export class ClasssrvService {
  url="http://localhost:3000/class"
  assignUrl="http://localhost:3000/assignment"
  // classsubject=new BehaviorSubject<String>(null);
  classchanged = new Subject<Class[]>();
  class:Class[] = [];
  isCreator:boolean
  constructor(private http: HttpClient) {}
  
  // #Get all class
  // classes(){
  //   return this.http.get(this.url)}
  
  // updateClass(data:any){
  //   this.classsubject.next(data)}
  
  addClass(classs:any ):Observable<any>{
    return this.http.post<any>(this.url,classs)}

  getClass(user:any):Observable<any>{
    return this.http.get(`${this.url}/get/`+user)}

  CheckCode(code:any):Observable<any>{
    return this.http.get(`${this.url}/code/join/`+code)
  }
  joinClass(data:any){
    return this.http.post(`${this.url}/join`,data)
  }
  classlist(userid:any){
    return this.http.get(`${this.url}/classlist/`+userid)
  }
  updateImg(id:any,img:any){
    return this.http.post<any>(`${this.url}/updateimg/`+id,img)}
  
  updateUserImg(id:any,img:any){
    return this.http.post<any>(`http://localhost:3000/user/updateUserimg/`+id,img)}
  
  getUserImg(id:any){
    return this.http.get(`http://localhost:3000/user/img/`+id)
  }
  // get_todo(id:any){
  //   return this.http.get(`${this.assignUrl}/todo/`+id)
  // }
  get_todo_classwise(id:any,classid:any){
    return this.http.get(`${this.assignUrl}/todo/class/`+id+`/`+classid)
  }
  get_todo_statuswise(id:any,status:any){
    return this.http.get(`${this.assignUrl}/todo/status/`+id+`/`+status)
  }
  update_setting(id:any,data:any){
    return this.http.post<any>(`http://localhost:3000/setting/`+id,data)
  }
  delete_classlistUser(id:any){
    return this.http.post(`${this.url}/user/delete/`+id,{isDeleted:true})
  }
}
