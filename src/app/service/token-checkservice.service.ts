import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, RequestOptions } from '@angular/http';


@Injectable()
export class TokenCheckserviceService {

  constructor(private _http: Http, public _auth: AuthService, private router: Router) { }

  response:boolean = false;
  headers: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this._auth.returnToken())
    .set('Content-Type', 'application/json'); 
    //.set('Cache-Control', "no-cache");
    
  headersFile: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this._auth.returnToken());
    
    
  headersMulti: HttpHeaders = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this._auth.returnToken())
    .set('Content-Type', []);

  public returnHeaders(): HttpHeaders {
    return this.headers;
  }
  public returnHeadersMulti(): HttpHeaders {
    return this.headersFile;
  }

  public check_token_session():boolean{
/*
    this._auth.activeSession('Bearer ' + this._auth.returnToken()).subscribe(
      (resp) => {
        this.response =  true;
        return this.response;
      },
      (errorResponse: HttpErrorResponse) => {
        // console.log(errorResponse);
        localStorage.clear()
        alert('Tu sesión ha expirado');
        this.response = false;
        this.router.navigateByUrl('/');

      }
    );

    return this.response;
*/ return true;
  }

}
