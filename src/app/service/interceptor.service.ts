import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';



@Injectable()
export class InterceptorService  implements HttpInterceptor{
  constructor(
    ) { 
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let final: string = `${localStorage.getItem('token')}`;
    const token: any = JSON.parse(final);
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token.token}`)
    });
    return next.handle(headers);
  }

}
