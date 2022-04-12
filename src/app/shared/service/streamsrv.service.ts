import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamsrvService {
  url="http://localhost:3000/post"
  constructor(private http: HttpClient) {}
  posts(){
    return this.http.get(this.url);
  }
}
