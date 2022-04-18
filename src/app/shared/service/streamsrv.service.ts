import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StreamsrvService {
  url="http://localhost:3000/post"
  constructor(private http: HttpClient) {}
  
  
  addpost(post:any ):Observable<any>{
    return this.http.post<any>(this.url,post)}
    
  // #Get posts
  getPost(classId:any):Observable<any>{
    return this.http.get(`${this.url}/get/`+classId)}
   
   // #Get posts
  getClassDetail(classId:any):Observable<any>{
    return this.http.get(`http://localhost:3000/class/getclass/`+classId)}     
}
