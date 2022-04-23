import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

@Injectable({providedIn: 'root'})
export class GoogleGapiService {
  private auth2!: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)
  private userObj: any
  public name:any
  private email:any

  constructor() {
    this.userObj = null;
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '407117015407-gksld6ruke97k5ngbqqbq9019e3ask34.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/userinfo.profile'
      })
    })
  }
  public signin() {
    return new Promise((res, rej) => {
      this.auth2.signIn().then(user => {
        this.userObj = user
        // console.log(user);
                
        res({name:this.userObj.Lu.tf,email:this.userObj.Lu.Bv});
      }).catch((e) => {
        // console.log(e)
      })
    })
  }
  public getuserdetail() {
    return new Promise((res, rej) => {
      this.auth2.signIn().then(user => {
        this.userObj = user
        res(this.userObj)
      }).catch((e) => {
        // console.log(e)
      })
    })
  }
  // public signout() {
  //   return new Promise((res, rej) => {
  //     this.auth2.signOut().then(() => {
  //       this.auth2.disconnect()
  //       res(null)
  //     })
  //   })
  // }
  public observable(): Observable<gapi.auth2.GoogleUser> {return this.subject.asObservable()}
}