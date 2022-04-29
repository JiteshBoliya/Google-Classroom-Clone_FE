import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StreamsrvService {
  url="http://localhost:3000/post"
  classUrl="http://localhost:3000/class"
  commentUrl="http://localhost:3000/comment"

  constructor(private http: HttpClient) {}
  
  // #Add post
  addpost(post:any ){ return this.http.post<any>(this.url,post)}
    
  // #Get posts
  getPost(classId:any){ return this.http.get(`${this.url}/get/`+classId)}
   
  // #Get posts
  getClassDetail(classId:any){ return this.http.get(`${this.classUrl}/getclass/`+classId)}
  
  // #Get creator of class
  getClassCreator(classId:any){ return this.http.get(`${this.classUrl}/getUserid/`+classId)}

  // #Add comment
  addComment(comment:any){ return this.http.post(this.commentUrl,comment)}

  // #get comment
  getComment(postId:any){ return this.http.get(`${this.commentUrl}/get/`+postId)}

  // #get userlist of class
  getUserlist(classId:any){ return this.http.get(`${this.classUrl}/userlist/`+classId)}






}
