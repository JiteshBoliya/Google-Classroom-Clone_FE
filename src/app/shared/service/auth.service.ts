import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private url="http://localhost:3000/user"
  userId:any

  // #User subject for storing current userinfo
  usersubject=new BehaviorSubject<User>(null);
  
  constructor(private http:HttpClient,
              private router:Router) {}

  updateUser(data:any){
    this.usersubject.next(data)}

  userLogin(user:any):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,user)}

  getToken(){
    return localStorage.getItem('userData')}
  
  getUser(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/`+id)}

  logout(user:any){
    return this.http.post<any>(`${this.url}/logout`,user)}
  
  // #Auto Login
  loggedIn(){
    return !!localStorage.getItem('userData')}

}
