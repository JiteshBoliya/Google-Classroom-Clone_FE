import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClasssrvService {
  url="http://localhost:3000/class"
  constructor(private http: HttpClient) {}
  classes(){
    return this.http.get(this.url);
  }
  addClass(classs:any ):Observable<any>{
    return this.http.post<any>(this.url,classs)
  }
}
