import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url="http://localhost:3000/user"
  constructor(private http:HttpClient,private router:Router) {}

  // userRegister(user:any):Observable<any>{
  //   return this.http.post<any>(this.url,user)
  // }
  userLogin(user:any):Observable<any>{
    console.log(user);
    return this.http.post<any>(`${this.url}/login`,user)
  }
  getToken(){
    return localStorage.getItem('userData');
  }
  getUser():Observable<any>{
    return this.http.get<any>(this.url)
  }
  logout(user:any){
    return this.http.post<any>(`${this.url}/logout`,user);
  }
  loggedIn(){
    return !!localStorage.getItem('userData')
  }
}
