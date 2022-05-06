import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable, catchError, Subject, BehaviorSubject } from 'rxjs';
// import { stringify } from 'querystring';
// import { Class } from '../models/class.model';
@Injectable({providedIn: 'root'})
export class AssignsrvService {
  url="http://localhost:3000/assignment"
  userUrl="http://localhost:3000/user"
  public classId:any
  public assignId:any
  public userId:any
  public usermail:any
  constructor(private http: HttpClient) {}
  
  addAssignment(assign:any ):Observable<any>{ return this.http.post<any>(this.url,assign)}
  
  getAssignment(classId:any){ return this.http.get(`${this.url}/get/`+classId)}

  getAllAssinment(){return this.http.get(`${this.url}/get`)}

  get_SpecificAssignment(assignId:any){return this.http.get(`${this.url}/getsp/`+assignId)}

  get_classDetail(assignId:any){return this.http.get(`${this.url}/getStatus/`+assignId)}

  get_countStatus(status:any,assignId:any):Observable<any>{return this.http.get(`${this.url}/count/status/`+status+`/`+assignId)}

  addUserAssignment(assign:any){return this.http.post<any>(`${this.url}/userAssignment`,assign)}

  addAssignmentComment(assign:any){return this.http.post<any>(`${this.url}/Comment/add`,assign)}

  getUserAssignment(AssignId:any){return this.http.get(`${this.url}/userAssignment/get`,AssignId)}

  getAllUserAssignment(classId:any){return this.http.get(`${this.url}/userAssignment/get/all/`+classId)}
 
  getuserAssignmentDetail(AssignId:any,userId:any){ return this.http.get(`${this.url}/userAssignment/get/`+AssignId+`/`+userId)}

  getComment(AssignId:any,pri:boolean){ return this.http.get(`${this.url}/Comment/`+AssignId+`/`+pri)}

  getPrivateComment(AssignId:any,pri:boolean,owner:any){ return this.http.get(`${this.url}/Comment/`+AssignId+`/`+pri+`/`+owner)}

  sendMail(data:any){return this.http.post(`${this.userUrl}/mail`,data)}

  updateMarks(data:any){return this.http.post(`${this.url}/userassignment/addmarks`,data)}

}
