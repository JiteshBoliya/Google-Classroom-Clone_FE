import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable, catchError, Subject, BehaviorSubject } from 'rxjs';
// import { stringify } from 'querystring';
// import { Class } from '../models/class.model';
@Injectable({providedIn: 'root'})
export class AssignsrvService {
  url="http://localhost:3000/assignment"
  public classId:any
  public assignId:any
  constructor(private http: HttpClient) {}
  
  addAssignment(assign:any ):Observable<any>{ return this.http.post<any>(this.url,assign)}
  
  getAssignment(classId:any){ return this.http.get(`${this.url}/get/`+classId)}

  getAllAssinment(){return this.http.get(`${this.url}/get`)}

  get_SpecificAssignment(assignId:any){return this.http.get(`${this.url}/getsp/`+assignId)}
}
