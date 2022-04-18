import { Injectable , Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorServiceService implements HttpInterceptor {
  constructor(private injector : Injector) {}
  intercept(req: any, next: any){
    const authService= this.injector.get(AuthService)
    let TokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    // console.log("Request",TokenizedReq)
    return next.handle(TokenizedReq)
  }
}